// Prérendu statique (SSG) post-build.
// Sert dist/ localement, ouvre chaque route dans un Chromium headless,
// laisse React rendre (titre/meta/JSON-LD + contenu), puis écrit le HTML
// complet dans dist/<route>/index.html. Vercel sert ces fichiers en
// priorité (le filesystem passe avant le rewrite SPA), et retombe sur le
// SPA pour les routes non prérendues (ex. /success, en noindex).
//
// FAIL-SOFT : si le navigateur ne se lance pas, on log un avertissement et
// on sort en code 0 — le build reste un SPA fonctionnel, jamais cassé.

import { createServer } from 'node:http'
import { readFileSync, existsSync, mkdirSync, writeFileSync, statSync } from 'node:fs'
import { join, dirname, extname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = resolve(__dirname, '..', 'dist')
const PORT = 5321

// Routes à prérendre (indexables). /success reste SPA (noindex).
const ROUTES = [
  '/',
  '/prix',
  '/blog/controle-cnil-2026',
  '/mentions-legales',
  '/cgv',
  '/politique-confidentialite',
  '/cookies',
]

// Hôtes externes bloqués pendant le prérendu (analytics/tag managers) :
// inutiles au contenu et peuvent empêcher le networkidle de se stabiliser.
const BLOCK_HOSTS = ['googletagmanager.com', 'google-analytics.com', 'connect.facebook.net', 'facebook.com']

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

function warn(msg) {
  console.warn(`[prerender] ${msg}`)
}

if (!existsSync(join(DIST, 'index.html'))) {
  warn('dist/index.html introuvable — prérendu ignoré.')
  process.exit(0)
}

// Template SPA original, servi tel quel pour toutes les routes (fallback),
// même après avoir écrit des fichiers prérendus sur le disque.
const INDEX_TEMPLATE = readFileSync(join(DIST, 'index.html'), 'utf8')

const server = createServer((req, res) => {
  try {
    const urlPath = decodeURIComponent((req.url || '/').split('?')[0])
    const ext = extname(urlPath)
    if (ext) {
      const filePath = join(DIST, urlPath)
      if (existsSync(filePath) && statSync(filePath).isFile()) {
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
        res.end(readFileSync(filePath))
        return
      }
      res.writeHead(404)
      res.end('not found')
      return
    }
    // Route applicative -> template SPA propre
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end(INDEX_TEMPLATE)
  } catch (e) {
    res.writeHead(500)
    res.end(String(e))
  }
})

async function resolveBrowser() {
  const puppeteer = (await import('puppeteer-core')).default
  // Sur Vercel (build Linux) : @sparticuz/chromium.
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    const chromium = (await import('@sparticuz/chromium')).default
    const executablePath = await chromium.executablePath()
    return puppeteer.launch({
      args: chromium.args,
      executablePath,
      headless: true,
    })
  }
  // Local : Chrome/Edge du système (surchargeable via PRERENDER_CHROME).
  const candidates = [
    process.env.PRERENDER_CHROME,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
  ].filter(Boolean)
  const executablePath = candidates.find((p) => existsSync(p))
  if (!executablePath) throw new Error('aucun Chromium local trouvé (définissez PRERENDER_CHROME)')
  return puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
}

async function run() {
  await new Promise((r) => server.listen(PORT, r))

  let browser
  try {
    browser = await resolveBrowser()
  } catch (e) {
    warn(`navigateur indisponible (${e.message}) — build SPA conservé.`)
    server.close()
    return
  }

  let ok = 0
  try {
    for (const route of ROUTES) {
      const page = await browser.newPage()
      try {
        await page.setRequestInterception(true)
        page.on('request', (r) => {
          const url = r.url()
          if (BLOCK_HOSTS.some((h) => url.includes(h))) r.abort()
          else r.continue()
        })
        await page.goto(`http://localhost:${PORT}${route}`, {
          waitUntil: 'networkidle0',
          timeout: 30000,
        })
        // Attendre que React ait posé le <title> (marqueur de rendu terminé).
        await page.waitForFunction(() => !!document.title && document.title.length > 3, { timeout: 15000 })
        await new Promise((r) => setTimeout(r, 250))

        const html = await page.evaluate(() => '<!DOCTYPE html>\n' + document.documentElement.outerHTML)

        const outPath = route === '/' ? join(DIST, 'index.html') : join(DIST, route, 'index.html')
        mkdirSync(dirname(outPath), { recursive: true })
        writeFileSync(outPath, html, 'utf8')
        ok++
        console.log(`[prerender] ${route} -> ${outPath.replace(DIST, 'dist')}`)
      } catch (e) {
        warn(`échec sur ${route}: ${e.message}`)
      } finally {
        await page.close().catch(() => {})
      }
    }
  } finally {
    await browser.close().catch(() => {})
    server.close()
  }
  console.log(`[prerender] terminé : ${ok}/${ROUTES.length} routes.`)
}

run().catch((e) => {
  warn(`erreur inattendue (${e.message}) — build SPA conservé.`)
  try {
    server.close()
  } catch {}
  process.exit(0)
})

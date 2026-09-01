// Prérendu statique (SSG) sans navigateur — 100 % Node, donc identique en
// local et sur Vercel (aucune dépendance à Chromium / libs système).
//
// Pipeline (voir package.json > build) :
//   1. vite build                 -> dist/ (client, SPA)
//   2. vite build --ssr ...        -> dist-ssr/entry-server.js
//   3. node scripts/prerender.mjs  -> ce script
//
// Pour chaque route : render(url) via renderToString, on relocalise les
// balises <head> (title/description/canonical/robots) + le JSON-LD dans le
// <head> du template, et on injecte le contenu dans <div id="root">. Vercel
// sert dist/<route>/index.html avant le rewrite SPA (filesystem-first) ;
// /success reste servi par le SPA (noindex).
//
// FAIL-SOFT : toute erreur -> avertissement + sortie 0 (le SPA reste livré).

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { parse } from 'node-html-parser'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const DIST = join(ROOT, 'dist')
const SSR_DIR = join(ROOT, 'dist-ssr')

// Routes indexables : fournies par le bundle SSR (source unique). Ce fallback
// ne sert que si l'export `routes` venait à manquer.
const FALLBACK_ROUTES = ['/', '/prix', '/blog', '/mentions-legales', '/cgv', '/politique-confidentialite', '/cookies']

// Sélecteurs des balises à remonter dans <head>.
const HEAD_SELECTOR =
  'title, meta[name="description"], link[rel="canonical"], meta[name="robots"], meta[property="og:title"], meta[property="og:description"], meta[property="og:url"], meta[name="twitter:title"], meta[name="twitter:description"], script[type="application/ld+json"]'

const warn = (m) => console.warn(`[prerender] ${m}`)

async function loadSsr() {
  if (!existsSync(SSR_DIR)) throw new Error('dist-ssr introuvable (étape vite --ssr manquante)')
  // Le bundle SSR porte le nom de l'entrée : entry-server.js (sinon, 1er .js).
  const candidates = readdirSync(SSR_DIR).filter((f) => f.endsWith('.js'))
  const file = candidates.includes('entry-server.js') ? 'entry-server.js' : candidates[0]
  if (!file) throw new Error('aucun bundle .js dans dist-ssr')
  const mod = await import(pathToFileURL(join(SSR_DIR, file)).href)
  if (typeof mod.render !== 'function') throw new Error('export render() absent du bundle SSR')
  return mod
}

function buildPage(template, appHtml) {
  const dom = parse(appHtml, { comment: true })
  const headNodes = dom.querySelectorAll(HEAD_SELECTOR)
  const headHtml = headNodes.map((n) => n.toString()).join('\n    ')
  headNodes.forEach((n) => n.remove())
  const rootHtml = dom.toString()

  let out = template
  if (headHtml) out = out.replace('</head>', `    ${headHtml}\n  </head>`)
  out = out.replace('<div id="root"></div>', `<div id="root">${rootHtml}</div>`)
  return out
}

async function run() {
  if (!existsSync(join(DIST, 'index.html'))) {
    warn('dist/index.html introuvable — prérendu ignoré.')
    return
  }
  const template = readFileSync(join(DIST, 'index.html'), 'utf8')

  let ssr
  try {
    ssr = await loadSsr()
  } catch (e) {
    warn(`bundle SSR indisponible (${e.message}) — build SPA conservé.`)
    return
  }
  const routes = Array.isArray(ssr.routes) && ssr.routes.length ? ssr.routes : FALLBACK_ROUTES

  let ok = 0
  for (const route of routes) {
    try {
      const appHtml = ssr.render(route)
      const page = buildPage(template, appHtml)
      const outPath = route === '/' ? join(DIST, 'index.html') : join(DIST, route, 'index.html')
      mkdirSync(dirname(outPath), { recursive: true })
      writeFileSync(outPath, page, 'utf8')
      ok++
      console.log(`[prerender] ${route} -> ${outPath.replace(DIST, 'dist')}`)
    } catch (e) {
      warn(`échec sur ${route}: ${e.message}`)
    }
  }
  console.log(`[prerender] terminé : ${ok}/${routes.length} routes.`)
}

run().catch((e) => {
  warn(`erreur inattendue (${e.message}) — build SPA conservé.`)
  process.exit(0)
})

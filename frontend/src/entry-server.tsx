// Entrée SSR utilisée uniquement par le prérendu (SSG) au build.
// Rend une route en HTML via renderToString + StaticRouter. Les effets ne
// s'exécutent pas côté serveur : on obtient le contenu de base (design,
// textes, titres, CTA) + les balises <head> (title/meta/canonical) et le
// JSON-LD, que scripts/prerender.mjs relocalise ensuite dans le <head>.
// CookieBanner n'est pas rendu ici (inutile au SEO, dépend du navigateur).

import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { AppRoutes } from './App'
import { METIERS } from './pages/blog/metiers'

/** Liste des routes indexables à prérendre (SSG). Source unique consommée par
 *  scripts/prerender.mjs. /success reste SPA (noindex). */
export const routes: string[] = [
  '/',
  '/prix',
  '/test-conformite-rgpd',
  '/blog',
  '/blog/guide-rgpd-tpe',
  '/blog/controle-cnil-2026',
  '/blog/rgpd-obligatoire-pour-qui',
  '/blog/rgpd-auto-entrepreneur',
  '/blog/rgpd-ecommerce',
  '/blog/rgpd-formulaire-contact',
  '/blog/duree-conservation-donnees',
  '/blog/rgpd-newsletter',
  '/blog/bandeau-cookies-conforme',
  '/blog/amende-cnil',
  ...METIERS.map((m) => `/blog/${m.slug}`),
  '/mentions-legales',
  '/cgv',
  '/politique-confidentialite',
  '/cookies',
]

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>,
  )
}

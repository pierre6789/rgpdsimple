// Entrée SSR utilisée uniquement par le prérendu (SSG) au build.
// Rend une route en HTML via renderToString + StaticRouter. Les effets ne
// s'exécutent pas côté serveur : on obtient le contenu de base (design,
// textes, titres, CTA) + les balises <head> (title/meta/canonical) et le
// JSON-LD, que scripts/prerender.mjs relocalise ensuite dans le <head>.
// CookieBanner n'est pas rendu ici (inutile au SEO, dépend du navigateur).

import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { AppRoutes } from './App'

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>,
  )
}

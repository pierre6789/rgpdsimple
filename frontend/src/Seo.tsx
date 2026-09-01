// Métadonnées par page via le support natif de React 19 (<title>/<meta>/<link>
// rendus dans un composant sont automatiquement remontés dans <head>).
// Une seule route est montée à la fois → un seul titre/description/canonical.

const SITE_URL = 'https://www.rgpdsimple.fr'

type SeoProps = {
  title: string
  description: string
  /** Chemin de la page, ex. "/" ou "/cgv" (pour le canonical). */
  path: string
  /** true = ne pas indexer (ex. page de confirmation post-paiement). */
  noindex?: boolean
}

export function Seo({ title, description, path, noindex = false }: SeoProps) {
  const url = `${SITE_URL}${path}`
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
    </>
  )
}

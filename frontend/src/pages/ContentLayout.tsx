import type { ReactNode } from 'react'
import { DesignHeader, DesignFooter } from '../DesignChrome'
import { Seo } from '../Seo'

type Props = {
  title: string
  description: string
  /** Chemin canonique, ex. "/prix" ou "/blog/controle-cnil-2026". */
  path: string
  children: ReactNode
  /** JSON-LD optionnel (Article, FAQPage, BreadcrumbList…). */
  jsonLd?: object
}

const SITE = 'https://www.rgpdsimple.fr'

/** Fil d'Ariane structuré (BreadcrumbList) à partir du chemin et du titre. */
function buildBreadcrumb(path: string, title: string) {
  const label = title.split(/[|—]/)[0].trim()
  const items: Array<{ '@type': 'ListItem'; position: number; name: string; item?: string }> = [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE}/` },
  ]
  if (path.startsWith('/blog/')) {
    items.push({ '@type': 'ListItem', position: 2, name: 'Guides RGPD', item: `${SITE}/blog` })
    items.push({ '@type': 'ListItem', position: 3, name: label })
  } else {
    items.push({ '@type': 'ListItem', position: 2, name: label })
  }
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items }
}

/** Layout partagé pour les pages de contenu et « money » (header/footer du design + prose + SEO). */
export function ContentLayout({ title, description, path, children, jsonLd }: Props) {
  const breadcrumb = buildBreadcrumb(path, title)
  return (
    <div className="rgpd-design content-page">
      <Seo title={title} description={description} path={path} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <DesignHeader />
      <main className="content-prose">{children}</main>
      <DesignFooter />
    </div>
  )
}

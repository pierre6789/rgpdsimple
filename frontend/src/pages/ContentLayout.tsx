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

/** Layout partagé pour les pages de contenu et « money » (header/footer du design + prose + SEO). */
export function ContentLayout({ title, description, path, children, jsonLd }: Props) {
  return (
    <div className="rgpd-design content-page">
      <Seo title={title} description={description} path={path} />
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <DesignHeader />
      <main className="content-prose">{children}</main>
      <DesignFooter />
    </div>
  )
}

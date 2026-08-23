import { ContentLayout } from '../ContentLayout'
import type { Metier } from './metiers'

export function MetierArticle({ metier }: { metier: Metier }) {
  const path = `/blog/${metier.slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: metier.h1,
        description: metier.description,
        inLanguage: 'fr-FR',
        author: { '@type': 'Organization', name: 'RGPD Simple' },
        publisher: {
          '@type': 'Organization',
          name: 'RGPD Simple',
          logo: { '@type': 'ImageObject', url: 'https://www.rgpdsimple.fr/logo.png' },
        },
        datePublished: '2026-08-23',
        dateModified: '2026-08-23',
        mainEntityOfPage: `https://www.rgpdsimple.fr${path}`,
      },
      {
        '@type': 'FAQPage',
        mainEntity: metier.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }

  return (
    <ContentLayout title={metier.title} description={metier.description} path={path} jsonLd={jsonLd}>
      <h1>{metier.h1}</h1>
      <p className="lead">{metier.lead}</p>
      <p className="meta">Mis à jour : août 2026 · Lecture 5 min</p>

      <h2>Êtes-vous concerné ?</h2>
      <p>{metier.concerned}</p>

      <h2>{metier.dataTitle}</h2>
      <ul>
        {metier.dataPoints.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>

      <h2>Les points à surveiller</h2>
      <p>{metier.risk}</p>

      <h2>Les documents à avoir</h2>
      <p>
        Quel que soit votre métier, la conformité repose sur les mêmes documents de base, à personnaliser selon votre
        activité :
      </p>
      <ul>
        <li>
          Une <a href="/politique-confidentialite">politique de confidentialité</a> (information des personnes).
        </li>
        <li>Des mentions légales complètes.</li>
        <li>Un registre des traitements (simplifié pour une TPE).</li>
        <li>Un bandeau cookies conforme si votre site utilise des traceurs.</li>
        <li>Des CGV si vous vendez en ligne.</li>
      </ul>
      <p>
        C'est le premier point vérifié lors d'un <a href="/blog/controle-cnil-2026">contrôle CNIL</a>.
      </p>

      <div className="cta-box">
        <h3>Vos documents, personnalisés pour votre activité</h3>
        <p>
          RGPD Simple génère les 5 documents conformes CNIL, adaptés à votre métier et livrés par email. 97 €,
          paiement unique, sans avocat.
        </p>
        <a className="cta-btn" href="/#commande">Me mettre en règle — 97 €</a>
        <p style={{ marginTop: '12px', marginBottom: 0, fontSize: '14px' }}>
          Comparer les solutions ? Voir le <a href="/prix">comparatif des prix</a> ou tous nos{' '}
          <a href="/blog">guides RGPD</a>.
        </p>
      </div>

      <h2>Questions fréquentes</h2>
      {metier.faq.map((f) => (
        <div key={f.q}>
          <h3>{f.q}</h3>
          <p>{f.a}</p>
        </div>
      ))}
    </ContentLayout>
  )
}

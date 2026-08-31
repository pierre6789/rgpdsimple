import { ContentLayout } from '../ContentLayout'
import { METIER_LINKS } from './metiers'

/** Guides thématiques (hors métiers). Le pilier en tête. */
export const ESSENTIALS = [
  {
    path: '/blog/guide-rgpd-tpe',
    title: 'Guide RGPD pour les TPE en 2026 (le guide complet)',
    description: 'Obligations, documents, étapes de mise en conformité et coûts — le point de départ.',
  },
  {
    path: '/blog/rgpd-obligatoire-pour-qui',
    title: 'Le RGPD est-il obligatoire pour vous ?',
    description: "La règle sans seuil, les cas concrets où vous êtes concerné et les rares exceptions.",
  },
  {
    path: '/blog/controle-cnil-2026',
    title: 'Contrôle CNIL 2026 : ce qui attend les TPE',
    description: "Qui est visé, ce que la CNIL vérifie, les amendes et la checklist pour être prêt.",
  },
  {
    path: '/blog/rgpd-auto-entrepreneur',
    title: 'RGPD auto-entrepreneur : vos obligations en 2026',
    description: "Êtes-vous concerné, quels documents sont obligatoires, ce que vous n'avez pas à faire.",
  },
  {
    path: '/blog/rgpd-ecommerce',
    title: "RGPD e-commerce : les documents obligatoires d'une boutique",
    description: 'Documents obligatoires, cookies et tracking, sous-traitants et checklist.',
  },
]

/** Guides pratiques / outils. */
export const PRACTICAL = [
  {
    path: '/test-conformite-rgpd',
    title: 'Test de conformité RGPD (gratuit, 2 min)',
    description: 'Évaluez votre conformité et découvrez les documents qu’il vous manque.',
  },
  {
    path: '/blog/rgpd-formulaire-contact',
    title: 'Mention RGPD formulaire de contact (générateur gratuit)',
    description: "Le texte à copier-coller sous votre formulaire + ce qu'il doit contenir.",
  },
  {
    path: '/blog/bandeau-cookies-conforme',
    title: 'Bandeau cookies conforme CNIL 2026',
    description: 'Les règles, les erreurs fréquentes et la checklist.',
  },
  {
    path: '/blog/duree-conservation-donnees',
    title: 'Combien de temps conserver les données clients ?',
    description: 'Le tableau des durées de conservation RGPD.',
  },
  {
    path: '/blog/rgpd-newsletter',
    title: 'RGPD et newsletter : consentement et désabonnement',
    description: 'Opt-in, exception clients, mentions et preuve du consentement.',
  },
  {
    path: '/blog/amende-cnil',
    title: "Amende CNIL pour une TPE : combien et comment l'éviter",
    description: 'Les montants réels et comment se protéger.',
  },
]

const ALL = [...ESSENTIALS, ...PRACTICAL, ...METIER_LINKS]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: ALL.map((a, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `https://www.rgpdsimple.fr${a.path}`,
    name: a.title,
  })),
}

function Card({ path, title, description }: { path: string; title: string; description: string }) {
  return (
    <div className="article-card">
      <h2 style={{ marginBottom: '6px' }}>
        <a href={path}>{title}</a>
      </h2>
      <p style={{ margin: 0 }}>{description}</p>
    </div>
  )
}

export function BlogIndex() {
  return (
    <ContentLayout
      title="Guides RGPD pour les TPE et indépendants | RGPD Simple"
      description="Guides RGPD clairs et à jour pour les TPE, artisans et indépendants : contrôles CNIL, auto-entrepreneur, e-commerce, métiers, cookies et documents obligatoires."
      path="/blog"
      jsonLd={jsonLd}
    >
      <h1>Guides RGPD pour les TPE, artisans et indépendants</h1>
      <p className="lead">
        Des guides clairs, sans jargon et à jour des règles 2026, pour comprendre vos obligations et vous mettre en
        conformité sans y passer des heures.
      </p>

      <h2>Guides essentiels</h2>
      {ESSENTIALS.map((a) => (
        <Card key={a.path} {...a} />
      ))}

      <h2>Guides pratiques &amp; outils</h2>
      {PRACTICAL.map((a) => (
        <Card key={a.path} {...a} />
      ))}

      <h2>Le RGPD par métier</h2>
      {METIER_LINKS.map((a) => (
        <Card key={a.path} {...a} />
      ))}

      <div className="cta-box">
        <h3>Prêt à vous mettre en règle ?</h3>
        <p>
          RGPD Simple génère vos 5 documents conformes CNIL, personnalisés pour votre activité et livrés par email.
          24,99 €, paiement unique, sans avocat.
        </p>
        <a className="cta-btn" href="/#commande">Obtenir mes documents — 24,99 €</a>
        <p style={{ marginTop: '12px', marginBottom: 0, fontSize: '14px' }}>
          Voir aussi le <a href="/prix">comparatif des prix de la conformité RGPD</a>.
        </p>
      </div>
    </ContentLayout>
  )
}

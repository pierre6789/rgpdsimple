import { ContentLayout } from '../ContentLayout'

const faq = [
  {
    q: 'Quelle amende RGPD risque une petite entreprise ?',
    a: "Via la procédure de sanction simplifiée de la CNIL, l'amende est plafonnée à 20 000 € pour les cas les moins complexes, sans divulgation du nom. Le régime général peut aller beaucoup plus loin mais vise essentiellement les grandes entreprises.",
  },
  {
    q: 'Quels manquements sont le plus souvent sanctionnés ?',
    a: "Les cookies non conformes (premier motif), le défaut d'information des personnes, les manquements à la sécurité, l'absence de base légale et la non-réponse aux demandes d'exercice des droits.",
  },
  {
    q: 'La CNIL prévient-elle avant de sanctionner ?',
    a: "Souvent, la CNIL adresse d'abord une mise en demeure laissant un délai pour se corriger. Mais elle peut aussi sanctionner directement selon la gravité. Se mettre en conformité en amont reste la meilleure protection.",
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: "Amende CNIL pour une TPE : combien et comment l'éviter",
      description:
        "Amendes RGPD pour une TPE : montants (procédure simplifiée plafonnée à 20 000 €), manquements sanctionnés et comment les éviter simplement.",
      inLanguage: 'fr-FR',
      image: ['https://www.rgpdsimple.fr/logo.png'],
      author: { '@id': 'https://www.rgpdsimple.fr/#organization' },
      publisher: { '@id': 'https://www.rgpdsimple.fr/#organization' },
      datePublished: '2026-08-23',
      dateModified: '2026-08-23',
      mainEntityOfPage: 'https://www.rgpdsimple.fr/blog/amende-cnil',
    },
    {
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
}

export function AmendeCnil() {
  return (
    <ContentLayout
      title="Amende CNIL pour une TPE : combien et comment l'éviter"
      description="Amendes RGPD pour une TPE : montants (procédure simplifiée plafonnée à 20 000 €), manquements sanctionnés et comment les éviter simplement."
      path="/blog/amende-cnil"
      jsonLd={jsonLd}
    >
      <h1>Amende CNIL pour une TPE : combien et comment l'éviter</h1>
      <p className="lead">
        Les amendes à plusieurs millions font les gros titres, mais elles visent les grands groupes. Pour une TPE, le
        risque est différent — et surtout facile à écarter. Voici les montants réels et comment s'en protéger.
      </p>
      <p className="meta">Mis à jour : août 2026 · Lecture 4 min</p>

      <h2>Les montants : deux régimes</h2>
      <ul>
        <li>
          <strong>Procédure simplifiée</strong> (petites structures, cas peu complexes) : amende <strong>plafonnée à
          20 000 €</strong>, sans divulgation publique du nom. C'est le cas de figure le plus probable pour une TPE.
        </li>
        <li>
          <strong>Régime général</strong> : jusqu'à des millions d'euros ou un pourcentage du chiffre d'affaires
          mondial. En pratique, réservé aux manquements graves de grandes entreprises.
        </li>
      </ul>

      <h2>Ce qui déclenche une sanction</h2>
      <ul>
        <li>Des <a href="/blog/bandeau-cookies-conforme">cookies non conformes</a> (premier motif de sanction).</li>
        <li>Un défaut d'information des personnes (pas de politique de confidentialité).</li>
        <li>Des manquements à la <strong>sécurité</strong> des données.</li>
        <li>L'absence de <strong>base légale</strong> (prospection sans consentement).</li>
        <li>La <strong>non-réponse</strong> aux demandes d'exercice des droits.</li>
      </ul>

      <h2>Comment se déroule le risque</h2>
      <p>
        La CNIL contrôle souvent en ligne, puis adresse fréquemment une <strong>mise en demeure</strong> avec un délai
        pour se corriger. Se mettre en conformité <strong>avant</strong> tout contrôle évite la sanction — voir notre
        article <a href="/blog/controle-cnil-2026">Contrôle CNIL 2026</a>.
      </p>

      <h2>Comment l'éviter (simplement)</h2>
      <ol>
        <li>Publier une politique de confidentialité et des mentions légales.</li>
        <li>Installer un bandeau cookies conforme.</li>
        <li>Tenir un registre des traitements.</li>
        <li>Définir des durées de conservation et sécuriser les accès.</li>
        <li>Savoir répondre à une demande de droits.</li>
      </ol>

      <div className="cta-box">
        <h3>20 000 € évitables pour 24,99 €</h3>
        <p>
          RGPD Simple génère les 5 documents conformes CNIL (dont le bandeau cookies), personnalisés pour votre
          activité et livrés par email. Sans avocat.
        </p>
        <a className="cta-btn" href="/#commande">Me mettre en règle — 24,99 €</a>
        <p style={{ marginTop: '12px', marginBottom: 0, fontSize: '14px' }}>
          Voir aussi le <a href="/prix">comparatif des prix</a> et le <a href="/blog/guide-rgpd-tpe">guide complet</a>.
        </p>
      </div>

      <h2>Questions fréquentes</h2>
      {faq.map((f) => (
        <div key={f.q}>
          <h3>{f.q}</h3>
          <p>{f.a}</p>
        </div>
      ))}
    </ContentLayout>
  )
}

import { ContentLayout } from '../ContentLayout'

const faq = [
  {
    q: 'Le consentement est-il obligatoire pour une newsletter ?',
    a: "Oui. L'inscription à une newsletter suppose un consentement libre, spécifique et non pré-coché. Vous devez aussi pouvoir prouver ce consentement (date, source).",
  },
  {
    q: "Puis-je écrire à mes clients existants sans consentement ?",
    a: "Il existe une exception : vous pouvez adresser des messages à vos clients pour des produits ou services analogues à ceux déjà achetés, à condition d'offrir le désabonnement dès la collecte et dans chaque email. Pour les prospects, le consentement préalable reste requis.",
  },
  {
    q: 'Le lien de désabonnement est-il obligatoire ?',
    a: "Oui, dans chaque email de prospection, de façon simple et gratuite. Le désabonnement doit être pris en compte rapidement.",
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'RGPD et newsletter : consentement, mentions et désabonnement',
      description:
        "Newsletter et RGPD : consentement opt-in, mentions à l'inscription, exception clients, désabonnement et preuve du consentement.",
      inLanguage: 'fr-FR',
      image: ['https://www.rgpdsimple.fr/logo.png'],
      author: { '@id': 'https://www.rgpdsimple.fr/#organization' },
      publisher: { '@id': 'https://www.rgpdsimple.fr/#organization' },
      datePublished: '2026-08-23',
      dateModified: '2026-08-23',
      mainEntityOfPage: 'https://www.rgpdsimple.fr/blog/rgpd-newsletter',
    },
    {
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
}

export function RgpdNewsletter() {
  return (
    <ContentLayout
      title="RGPD newsletter : consentement, mentions, désabonnement"
      description="Newsletter et RGPD : consentement opt-in, mentions à l'inscription, exception clients, désabonnement et preuve du consentement. Les règles claires."
      path="/blog/rgpd-newsletter"
      jsonLd={jsonLd}
    >
      <h1>RGPD et newsletter : consentement, mentions et désabonnement</h1>
      <p className="lead">
        Une newsletter est de la prospection : elle obéit à des règles précises de consentement et d'information.
        Voici ce qu'il faut respecter, sans risque de sanction.
      </p>
      <p className="meta">Mis à jour : août 2026 · Lecture 4 min</p>

      <h2>Le consentement, la règle de base</h2>
      <p>
        Pour inscrire quelqu'un à votre newsletter, il faut un <strong>consentement libre, spécifique et éclairé</strong> :
        une case à cocher <strong>non pré-cochée</strong>, dédiée à la newsletter (distincte des CGV ou d'un formulaire
        de contact). Vous devez aussi pouvoir <strong>prouver</strong> ce consentement (date, source).
      </p>

      <h2>L'exception « clients existants »</h2>
      <p>
        Vous pouvez adresser des emails à vos <strong>clients existants</strong> pour des produits ou services
        <strong> analogues</strong> à ceux déjà achetés, sans consentement préalable — à condition d'avoir offert le
        désabonnement au moment de la collecte et dans chaque email. Pour les <strong>prospects</strong>, le
        consentement reste obligatoire.
      </p>

      <h2>Ce qu'il faut afficher à l'inscription</h2>
      <ul>
        <li>La <strong>finalité</strong> (recevoir la newsletter / les offres).</li>
        <li>Le <strong>responsable</strong> et un <strong>contact</strong>.</li>
        <li>Un lien vers la <a href="/politique-confidentialite">politique de confidentialité</a>.</li>
        <li>La possibilité de se désinscrire à tout moment.</li>
      </ul>

      <h2>Le désabonnement</h2>
      <p>
        Chaque email doit contenir un lien de désabonnement <strong>simple et gratuit</strong>, pris en compte
        rapidement. C'est une obligation, et un point régulièrement contrôlé.
      </p>

      <h2>Double opt-in : recommandé</h2>
      <p>
        Le double opt-in (email de confirmation après l'inscription) n'est pas strictement obligatoire mais fortement
        recommandé : il fiabilise votre liste et constitue une excellente preuve du consentement.
      </p>

      <div className="cta-box">
        <h3>Vos documents RGPD, prêts à l'emploi</h3>
        <p>
          RGPD Simple génère votre politique de confidentialité et vos mentions, qui couvrent la gestion de vos
          contacts et de votre prospection. 24,99 €, livrés par email, sans avocat.
        </p>
        <a className="cta-btn" href="/#commande">Obtenir mes documents — 24,99 €</a>
        <p style={{ marginTop: '12px', marginBottom: 0, fontSize: '14px' }}>
          Voir aussi : <a href="/blog/rgpd-formulaire-contact">mention RGPD formulaire de contact</a>.
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

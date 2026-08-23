import { ContentLayout } from '../ContentLayout'

const faq = [
  {
    q: 'Un bandeau cookies est-il obligatoire ?',
    a: "Dès que votre site dépose des cookies non essentiels (mesure d'audience, publicité, réseaux sociaux), oui : ils ne peuvent être déposés qu'après le consentement de l'internaute, recueilli via un bandeau conforme.",
  },
  {
    q: 'Refuser doit-il être aussi simple qu’accepter ?',
    a: "Oui. La CNIL exige que refuser soit aussi simple qu'accepter : idéalement un bouton « Tout refuser » au même niveau que « Tout accepter », dès le premier écran.",
  },
  {
    q: 'Google Analytics nécessite-t-il le consentement ?',
    a: "Dans la plupart des configurations, oui. Seule une mesure d'audience strictement encadrée et exemptée par la CNIL peut s'en dispenser ; par défaut, Google Analytics requiert le consentement.",
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Bandeau cookies conforme CNIL en 2026 (+ erreurs à éviter)',
      description:
        "Les règles d'un bandeau cookies conforme à la CNIL en 2026 : refuser aussi simple qu'accepter, rien avant consentement, erreurs fréquentes et checklist.",
      inLanguage: 'fr-FR',
      author: { '@type': 'Organization', name: 'RGPD Simple' },
      publisher: { '@type': 'Organization', name: 'RGPD Simple', logo: { '@type': 'ImageObject', url: 'https://www.rgpdsimple.fr/logo.png' } },
      datePublished: '2026-08-23',
      dateModified: '2026-08-23',
      mainEntityOfPage: 'https://www.rgpdsimple.fr/blog/bandeau-cookies-conforme',
    },
    {
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
}

export function BandeauCookiesConforme() {
  return (
    <ContentLayout
      title="Bandeau cookies conforme CNIL 2026 (+ erreurs à éviter)"
      description="Les règles d'un bandeau cookies conforme CNIL en 2026 : refuser aussi simple qu'accepter, rien avant consentement, erreurs fréquentes et checklist."
      path="/blog/bandeau-cookies-conforme"
      jsonLd={jsonLd}
    >
      <h1>Bandeau cookies conforme CNIL en 2026 (et les erreurs à éviter)</h1>
      <p className="lead">
        Les cookies sont le premier motif de sanction de la CNIL. Un bandeau conforme n'est pas compliqué, mais il
        obéit à des règles précises. Voici ce qu'il faut respecter, et les pièges classiques.
      </p>
      <p className="meta">Mis à jour : août 2026 · Lecture 4 min</p>

      <h2>Les règles d'un bandeau conforme</h2>
      <ul>
        <li><strong>Rien avant le consentement</strong> : aucun cookie non essentiel déposé tant que l'internaute n'a pas accepté.</li>
        <li><strong>Refuser = accepter</strong> : un bouton « Tout refuser » aussi visible et simple que « Tout accepter », dès le premier écran.</li>
        <li><strong>Choix libre et éclairé</strong> : information sur les finalités, possibilité de choisir par catégorie.</li>
        <li><strong>Choix conservé</strong> et possibilité d'en changer facilement à tout moment.</li>
        <li><strong>Preuve</strong> du consentement conservée.</li>
      </ul>

      <h2>Les erreurs fréquentes</h2>
      <ul>
        <li>Déposer les cookies <strong>dès l'arrivée</strong>, avant tout choix.</li>
        <li>Un bouton « Accepter » bien visible et un « Refuser » <strong>caché</strong> ou en plusieurs clics.</li>
        <li>Des cases <strong>pré-cochées</strong> pour les cookies non essentiels.</li>
        <li>Continuer la navigation interprété comme un consentement (interdit).</li>
        <li>Pas de moyen simple de <strong>revenir</strong> sur son choix.</li>
      </ul>

      <h2>Quels cookies sont concernés ?</h2>
      <p>
        Les cookies <strong>strictement nécessaires</strong> (panier, session, sécurité) ne requièrent pas de
        consentement. En revanche, la <strong>mesure d'audience</strong> (Google Analytics), la <strong>publicité</strong>
        (pixel Meta, retargeting) et les <strong>réseaux sociaux</strong> nécessitent le consentement préalable.
      </p>

      <h2>Checklist du bandeau conforme</h2>
      <ol>
        <li>Aucun traceur non essentiel avant le clic.</li>
        <li>« Tout accepter » et « Tout refuser » au même niveau.</li>
        <li>Choix par catégorie possible.</li>
        <li>Lien vers la politique cookies.</li>
        <li>Possibilité de modifier son choix plus tard.</li>
      </ol>

      <div className="cta-box">
        <h3>Un bandeau cookies conforme, inclus dans le pack</h3>
        <p>
          Le pack RGPD Simple inclut un bandeau cookies conforme CNIL, prêt à intégrer, en plus de vos 4 autres
          documents. 97 €, livrés par email, sans avocat.
        </p>
        <a className="cta-btn" href="/#commande">Obtenir mon bandeau + mes documents — 97 €</a>
        <p style={{ marginTop: '12px', marginBottom: 0, fontSize: '14px' }}>
          À lire aussi : <a href="/blog/controle-cnil-2026">Contrôle CNIL 2026</a>.
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

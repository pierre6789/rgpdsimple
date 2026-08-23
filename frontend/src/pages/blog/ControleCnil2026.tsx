import { ContentLayout } from '../ContentLayout'

const faq = [
  {
    q: 'La CNIL contrôle-t-elle vraiment les TPE en 2026 ?',
    a: "Oui. La CNIL a élargi ses contrôles aux petites structures via une procédure de sanction simplifiée (amende plafonnée à 20 000 €). Les cookies non conformes sont son premier motif de sanction.",
  },
  {
    q: 'Comment se passe un contrôle CNIL ?',
    a: "Un contrôle peut être en ligne (analyse de votre site), sur pièces (demande de documents), sur audition ou sur place. La CNIL vérifie notamment votre bandeau cookies, vos mentions d'information, votre registre des traitements et le respect des droits des personnes.",
  },
  {
    q: 'Quelle amende risque une petite entreprise ?',
    a: "Via la procédure simplifiée, l'amende est plafonnée à 20 000 € (sans divulgation du nom). Le régime général peut aller bien au-delà, mais vise surtout les grandes entreprises.",
  },
  {
    q: 'Comment être prêt rapidement ?',
    a: "Mettez en place les 5 documents essentiels (politique de confidentialité, mentions légales, CGV, registre des traitements, bandeau cookies conforme) et un bandeau cookies qui bloque les traceurs avant consentement. Un pack clé en main permet d'être en règle en quelques minutes.",
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Contrôle CNIL 2026 : ce qui attend les TPE (et comment s’y préparer)',
      description:
        "Contrôles CNIL 2026 : qui est visé, ce que la CNIL vérifie, les amendes encourues par une TPE et la checklist pour être prêt.",
      inLanguage: 'fr-FR',
      author: { '@type': 'Organization', name: 'RGPD Simple' },
      publisher: { '@type': 'Organization', name: 'RGPD Simple', logo: { '@type': 'ImageObject', url: 'https://www.rgpdsimple.fr/logo.png' } },
      datePublished: '2026-08-23',
      dateModified: '2026-08-23',
      mainEntityOfPage: 'https://www.rgpdsimple.fr/blog/controle-cnil-2026',
    },
    {
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
}

export function ControleCnil2026() {
  return (
    <ContentLayout
      title="Contrôle CNIL 2026 : ce qui attend les TPE (guide)"
      description="Contrôles CNIL 2026 : qui est visé, ce que la CNIL vérifie, les amendes pour une TPE et la checklist pour être prêt rapidement."
      path="/blog/controle-cnil-2026"
      jsonLd={jsonLd}
    >
      <h1>Contrôle CNIL 2026 : ce qui attend les TPE (et comment s'y préparer)</h1>
      <p className="lead">
        Longtemps réservés aux grands groupes, les contrôles de la CNIL touchent désormais aussi les très petites
        entreprises. Voici, sans jargon, qui est visé en 2026, ce que la CNIL vérifie et comment être en règle
        rapidement.
      </p>
      <p className="meta">Mis à jour : août 2026 · Lecture 5 min</p>

      <h2>Les TPE sont-elles vraiment concernées ?</h2>
      <p>
        Oui. La CNIL dispose d'une <strong>procédure de sanction simplifiée</strong> qui lui permet de sanctionner
        rapidement les petites structures, avec une amende <strong>plafonnée à 20 000 €</strong>. Dans son bilan
        récent, les <strong>cookies</strong> non conformes sont le premier motif de sanction. Autrement dit : un
        simple site avec un formulaire de contact, Google Analytics ou un pixel Meta suffit à être concerné.
      </p>

      <h2>Comment se déroule un contrôle CNIL ?</h2>
      <p>La CNIL peut contrôler de quatre façons :</p>
      <ul>
        <li><strong>En ligne</strong> : analyse directe de votre site (bandeau cookies, mentions, traceurs déposés).</li>
        <li><strong>Sur pièces</strong> : la CNIL vous demande des documents (registre, politique, preuves de consentement).</li>
        <li><strong>Sur audition</strong> : convocation dans ses locaux.</li>
        <li><strong>Sur place</strong> : visite dans vos locaux.</li>
      </ul>
      <p>
        Le contrôle en ligne est le plus fréquent pour une TPE : il ne prévient pas et ne demande aucune coopération
        de votre part. C'est votre site, tel qu'il est aujourd'hui, qui est jugé.
      </p>

      <h2>Ce que la CNIL vérifie en priorité</h2>
      <ul>
        <li><strong>Le bandeau cookies</strong> : « Tout refuser » aussi simple qu'« Tout accepter », aucun traceur non essentiel déposé avant consentement.</li>
        <li><strong>L'information des personnes</strong> : une <a href="/politique-confidentialite">politique de confidentialité</a> claire et accessible.</li>
        <li><strong>Le registre des traitements</strong> : la liste de vos traitements (clients, prospection, site…).</li>
        <li><strong>Le respect des droits</strong> : accès, rectification, effacement, opposition.</li>
        <li><strong>Les durées de conservation</strong> et la sécurité des données.</li>
      </ul>

      <h2>Quelle amende pour une petite entreprise ?</h2>
      <p>
        Via la procédure simplifiée, l'amende est <strong>plafonnée à 20 000 €</strong> et votre nom n'est pas
        divulgué. Ce n'est pas le million des grands groupes, mais pour une TPE, c'est une somme qui fait mal — et
        totalement évitable.
      </p>

      <h2>La checklist pour être prêt</h2>
      <ol>
        <li>Un <strong>bandeau cookies conforme</strong> (refus aussi simple que l'acceptation, blocage avant consentement).</li>
        <li>Une <strong>politique de confidentialité</strong> à jour (finalités, durées, droits, transferts).</li>
        <li>Des <strong>mentions légales</strong> complètes.</li>
        <li>Un <strong>registre des traitements</strong> tenu à jour.</li>
        <li>Des <strong>CGV</strong> conformes si vous vendez.</li>
      </ol>

      <div className="cta-box">
        <h3>Soyez prêt en quelques minutes</h3>
        <p>
          RGPD Simple génère vos 5 documents conformes CNIL (dont le bandeau cookies), personnalisés pour votre
          activité et livrés par email. 97 €, paiement unique, sans avocat.
        </p>
        <a className="cta-btn" href="/#commande">Mettre mon activité en règle — 97 €</a>
        <p style={{ marginTop: '12px', marginBottom: 0, fontSize: '14px' }}>
          Vous hésitez sur le budget ? Voir le <a href="/prix">comparatif des prix de la conformité RGPD</a>.
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

import { ContentLayout } from '../ContentLayout'

const faq = [
  {
    q: 'Le RGPD est-il obligatoire pour les petites entreprises ?',
    a: "Oui. Le RGPD ne prévoit aucun seuil de taille ou de chiffre d'affaires. Une TPE, un auto-entrepreneur ou un indépendant est soumis aux mêmes principes qu'une grande entreprise, avec une mise en œuvre plus simple.",
  },
  {
    q: 'Une association est-elle concernée par le RGPD ?',
    a: "Oui. Dès qu'une association gère un fichier d'adhérents, de donateurs ou de bénévoles, elle traite des données personnelles et doit respecter le RGPD.",
  },
  {
    q: 'Y a-t-il des cas où le RGPD ne s’applique pas ?',
    a: "Oui, pour un usage strictement personnel ou domestique (répertoire privé, photos de famille). Dès qu'il y a une activité professionnelle ou associative, le RGPD s'applique.",
  },
  {
    q: 'Que risque-t-on si on ne respecte pas le RGPD ?',
    a: "Des sanctions de la CNIL, avec une procédure simplifiée plafonnée à 20 000 € pour les petites structures. Au-delà de l'amende, un manquement peut nuire à la confiance de vos clients.",
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Le RGPD est-il obligatoire pour vous ? (TPE, micro, EI, association)',
      description:
        "RGPD obligatoire pour qui ? La règle sans seuil, les cas concrets où vous êtes concerné et les rares exceptions. Pour TPE, auto-entrepreneurs et associations.",
      inLanguage: 'fr-FR',
      author: { '@type': 'Organization', name: 'RGPD Simple' },
      publisher: { '@type': 'Organization', name: 'RGPD Simple', logo: { '@type': 'ImageObject', url: 'https://www.rgpdsimple.fr/logo.png' } },
      datePublished: '2026-08-23',
      dateModified: '2026-08-23',
      mainEntityOfPage: 'https://www.rgpdsimple.fr/blog/rgpd-obligatoire-pour-qui',
    },
    {
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
}

export function RgpdObligatoirePourQui() {
  return (
    <ContentLayout
      title="RGPD obligatoire pour qui ? (TPE, micro, EI, association)"
      description="RGPD obligatoire pour qui ? La règle sans seuil, les cas concrets où vous êtes concerné et les rares exceptions. Pour TPE, auto-entrepreneurs et associations."
      path="/blog/rgpd-obligatoire-pour-qui"
      jsonLd={jsonLd}
    >
      <h1>Le RGPD est-il obligatoire pour vous ?</h1>
      <p className="lead">
        « Je suis trop petit pour être concerné » : c'est l'idée reçue la plus répandue — et la plus fausse. Voici, en
        clair, qui doit respecter le RGPD, avec les cas concrets et les rares exceptions.
      </p>
      <p className="meta">Mis à jour : août 2026 · Lecture 4 min</p>

      <h2>La règle : aucun seuil</h2>
      <p>
        Le RGPD s'applique à <strong>toute organisation qui traite des données personnelles</strong>, quelle que soit
        sa taille et son chiffre d'affaires. Il n'existe <strong>pas de seuil</strong> en dessous duquel on serait
        dispensé. Ce qui change avec la taille, ce n'est pas l'obligation, c'est la <strong>manière</strong> — bien
        plus simple pour une TPE.
      </p>

      <h2>Êtes-vous concerné ? (cas concrets)</h2>
      <p>Vous êtes concerné dès que vous faites l'une de ces choses :</p>
      <ul>
        <li>Tenir un <strong>fichier clients ou prospects</strong> (même un simple tableur).</li>
        <li>Avoir un <strong>formulaire</strong> de contact, de devis ou d'inscription sur votre site.</li>
        <li>Utiliser des <strong>cookies</strong> de mesure d'audience ou publicitaires.</li>
        <li>Envoyer une <strong>newsletter</strong> ou faire de la prospection.</li>
        <li>Gérer des <strong>rendez-vous</strong>, une fidélité, des avis.</li>
        <li>Installer une <strong>vidéosurveillance</strong> ou employer des <strong>salariés</strong>.</li>
      </ul>

      <h2>« Je suis… » : tous concernés</h2>
      <ul>
        <li><strong>Auto-entrepreneur / micro-entreprise</strong> — oui (voir le <a href="/blog/rgpd-auto-entrepreneur">guide dédié</a>).</li>
        <li><strong>Entreprise individuelle (EI), profession libérale</strong> — oui.</li>
        <li><strong>TPE / PME de moins de 50 salariés</strong> — oui.</li>
        <li><strong>E-commerçant</strong> — oui, et particulièrement exposé (voir le <a href="/blog/rgpd-ecommerce">guide e-commerce</a>).</li>
        <li><strong>Association</strong> — oui, dès qu'il y a un fichier d'adhérents ou de donateurs.</li>
      </ul>

      <h2>Les rares cas non concernés</h2>
      <p>
        Le RGPD ne s'applique pas à un usage <strong>strictement personnel ou domestique</strong> : votre répertoire
        téléphonique privé, vos photos de famille. Dès qu'une activité professionnelle ou associative entre en jeu, le
        RGPD s'applique.
      </p>

      <h2>Concrètement, qu'est-ce que ça implique ?</h2>
      <p>
        Pour une TPE, la conformité tient à quelques documents bien faits : politique de confidentialité, mentions
        légales, registre des traitements, bandeau cookies et CGV si vous vendez. Tout est détaillé dans notre{' '}
        <a href="/blog/guide-rgpd-tpe">guide RGPD pour les TPE</a>.
      </p>

      <div className="cta-box">
        <h3>Être en règle sans y passer des heures</h3>
        <p>
          RGPD Simple génère vos 5 documents conformes CNIL, personnalisés pour votre activité et livrés par email.
          97 €, paiement unique, sans avocat.
        </p>
        <a className="cta-btn" href="/#commande">Obtenir mes documents — 97 €</a>
        <p style={{ marginTop: '12px', marginBottom: 0, fontSize: '14px' }}>
          Voir aussi le <a href="/prix">comparatif des prix</a> et tous nos <a href="/blog">guides RGPD</a>.
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

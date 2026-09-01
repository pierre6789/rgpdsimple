import { ContentLayout } from '../ContentLayout'

const faq = [
  {
    q: 'Un auto-entrepreneur est-il vraiment concerné par le RGPD ?',
    a: "Oui. Le RGPD s'applique dès que vous collectez des données personnelles (nom, email, téléphone d'un client ou prospect), quelle que soit la taille de votre activité. Être seul ou en micro-entreprise ne dispense pas des obligations, cela les simplifie seulement.",
  },
  {
    q: 'Un auto-entrepreneur doit-il nommer un DPO ?',
    a: "Non, dans la quasi-totalité des cas. La désignation d'un délégué à la protection des données (DPO) n'est obligatoire que pour le suivi à grande échelle ou le traitement de données sensibles à grande échelle — ce qui ne concerne pas une activité classique de TPE.",
  },
  {
    q: 'Faut-il tenir un registre des traitements en micro-entreprise ?',
    a: "Oui, mais en version simplifiée. Les structures de moins de 250 personnes en sont partiellement dispensées, mais la CNIL recommande à tous de tenir un registre simplifié listant leurs traitements (clients, prospection, site).",
  },
  {
    q: 'Quels documents dois-je avoir concrètement ?',
    a: "Une politique de confidentialité, des mentions légales, un registre des traitements, un bandeau cookies conforme si votre site utilise des traceurs, et des CGV si vous vendez. RGPD Simple les génère personnalisés pour votre activité pour 24,99 €.",
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'RGPD auto-entrepreneur : vos obligations en 2026 (guide + checklist)',
      description:
        "Auto-entrepreneur et RGPD : êtes-vous concerné, quels documents sont obligatoires, ce que vous n'avez pas à faire, et la checklist pour être en règle.",
      inLanguage: 'fr-FR',
      image: ['https://www.rgpdsimple.fr/logo.png'],
      author: { '@id': 'https://www.rgpdsimple.fr/#organization' },
      publisher: { '@id': 'https://www.rgpdsimple.fr/#organization' },
      datePublished: '2026-08-23',
      dateModified: '2026-08-23',
      mainEntityOfPage: 'https://www.rgpdsimple.fr/blog/rgpd-auto-entrepreneur',
    },
    {
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
}

export function RgpdAutoEntrepreneur() {
  return (
    <ContentLayout
      title="RGPD auto-entrepreneur : obligations 2026 (checklist)"
      description="Auto-entrepreneur et RGPD en 2026 : êtes-vous concerné, quels documents sont obligatoires, ce que vous n'avez pas à faire, et la checklist pour être en règle."
      path="/blog/rgpd-auto-entrepreneur"
      jsonLd={jsonLd}
    >
      <h1>RGPD auto-entrepreneur : vos obligations en 2026 (guide + checklist)</h1>
      <p className="lead">
        Micro-entrepreneur, freelance ou indépendant : oui, le RGPD vous concerne, même seul et même sans salarié.
        Bonne nouvelle, pour une activité classique les obligations sont limitées et rapides à couvrir. Voici
        lesquelles, sans jargon.
      </p>
      <p className="meta">Mis à jour : août 2026 · Lecture 6 min</p>

      <h2>Êtes-vous concerné ? (spoiler : oui)</h2>
      <p>
        Le RGPD s'applique dès que vous traitez des <strong>données personnelles</strong> : le nom et l'email d'un
        client, un numéro de téléphone, un fichier de prospects, les cookies de votre site. La taille de l'entreprise
        ne change <strong>pas</strong> l'obligation — un auto-entrepreneur avec un simple formulaire de contact est
        soumis aux mêmes principes qu'une grande entreprise, avec une mise en œuvre beaucoup plus simple.
      </p>

      <h2>Ce que vous devez avoir</h2>
      <ul>
        <li><strong>Une information claire des personnes</strong> — via une <a href="/politique-confidentialite">politique de confidentialité</a> : qui vous êtes, quelles données, pourquoi, combien de temps, et leurs droits.</li>
        <li><strong>Des mentions légales</strong> conformes (identité, SIRET, hébergeur, contact).</li>
        <li><strong>Un registre des traitements</strong>, en version simplifiée : la liste de vos traitements (clients, prospection, site internet).</li>
        <li><strong>Un bandeau cookies conforme</strong> si votre site dépose des traceurs (Google Analytics, pixel Meta…) : refus aussi simple que l'acceptation, rien avant consentement.</li>
        <li><strong>Des CGV</strong> si vous vendez (obligatoires vis-à-vis des consommateurs).</li>
        <li><strong>Des mesures de sécurité</strong> raisonnables et des <strong>durées de conservation</strong> définies.</li>
      </ul>

      <h2>Ce que vous n'avez (généralement) PAS à faire</h2>
      <ul>
        <li><strong>Nommer un DPO</strong> : inutile pour une activité classique. Obligatoire seulement en cas de suivi ou de données sensibles à grande échelle.</li>
        <li><strong>Une analyse d'impact (AIPD)</strong> : réservée aux traitements à risque élevé, rare en TPE.</li>
        <li><strong>Un registre lourd type grand groupe</strong> : un registre simplifié suffit.</li>
      </ul>
      <p>
        Autrement dit : la conformité d'un auto-entrepreneur tient surtout à <strong>quelques documents bien faits</strong>,
        pas à une usine à gaz.
      </p>

      <h2>Le cas du site internet et du formulaire de contact</h2>
      <p>
        Dès que votre site a un formulaire (contact, devis, newsletter), vous collectez des données : il faut informer
        (lien vers la politique de confidentialité) et ne recueillir que le nécessaire. Si vous utilisez des cookies de
        mesure d'audience ou publicitaires, ils ne doivent se déclencher <strong>qu'après consentement</strong> via un
        bandeau conforme. C'est le premier point vérifié lors d'un <a href="/blog/controle-cnil-2026">contrôle CNIL</a>.
      </p>

      <h2>Checklist express</h2>
      <ol>
        <li>Politique de confidentialité en ligne et accessible.</li>
        <li>Mentions légales complètes.</li>
        <li>Registre des traitements (simplifié) tenu à jour.</li>
        <li>Bandeau cookies conforme si traceurs.</li>
        <li>CGV si vous vendez.</li>
        <li>Durées de conservation + sécurité de base.</li>
      </ol>

      <div className="cta-box">
        <h3>Tous vos documents, personnalisés, en quelques minutes</h3>
        <p>
          RGPD Simple génère les 5 documents (politique, mentions, CGV, registre, bandeau cookies) adaptés à votre
          activité d'indépendant, livrés par email. 24,99 €, paiement unique, sans avocat.
        </p>
        <a className="cta-btn" href="/#commande">Mettre mon activité en règle — 24,99 €</a>
        <p style={{ marginTop: '12px', marginBottom: 0, fontSize: '14px' }}>
          Comparer avec un avocat ou une agence ? Voir le <a href="/prix">comparatif des prix</a>.
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

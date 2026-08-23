import { ContentLayout } from '../ContentLayout'

const rows = [
  ['Prospects (prospection commerciale)', "3 ans après le dernier contact"],
  ['Clients (relation active)', "Durée de la relation, puis 3 ans en prospection"],
  ['Factures et pièces comptables', '10 ans'],
  ['Contrats', "5 ans après la fin du contrat (parfois plus)"],
  ['Cookies et traceurs (durée de vie)', '13 mois maximum'],
  ["Données de mesure d'audience", '25 mois maximum'],
  ['Choix cookies (accepter/refuser)', "~6 mois avant nouvelle demande"],
  ['Candidatures non retenues', "2 ans (avec information du candidat)"],
  ['Images de vidéosurveillance', "1 mois en général"],
]

const faq = [
  {
    q: 'Combien de temps peut-on conserver les données clients ?',
    a: "Pendant la durée de la relation commerciale, puis en général 3 ans après le dernier contact pour la prospection. Les données de facturation se conservent à part, jusqu'à 10 ans (obligations comptables).",
  },
  {
    q: 'Que faire des données à la fin de la durée ?',
    a: "Les supprimer, ou les anonymiser, ou les archiver de façon sécurisée si une obligation légale l'impose (comptabilité, litige). Elles ne doivent pas rester accessibles indéfiniment.",
  },
  {
    q: 'Faut-il indiquer les durées dans la politique de confidentialité ?',
    a: "Oui. Le RGPD impose d'informer les personnes des durées de conservation (ou des critères qui les déterminent). Elles figurent dans votre politique de confidentialité.",
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Combien de temps conserver les données clients ? (durées RGPD 2026)',
      description:
        "Durées de conservation RGPD pour une TPE : clients, prospects, factures, cookies, vidéosurveillance… Le tableau récapitulatif et les bonnes pratiques.",
      inLanguage: 'fr-FR',
      author: { '@type': 'Organization', name: 'RGPD Simple' },
      publisher: { '@type': 'Organization', name: 'RGPD Simple', logo: { '@type': 'ImageObject', url: 'https://www.rgpdsimple.fr/logo.png' } },
      datePublished: '2026-08-23',
      dateModified: '2026-08-23',
      mainEntityOfPage: 'https://www.rgpdsimple.fr/blog/duree-conservation-donnees',
    },
    {
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
}

export function DureeConservationDonnees() {
  return (
    <ContentLayout
      title="Combien de temps conserver les données clients ? (RGPD 2026)"
      description="Durées de conservation RGPD pour une TPE : clients, prospects, factures, cookies, vidéosurveillance… Tableau récapitulatif et bonnes pratiques."
      path="/blog/duree-conservation-donnees"
      jsonLd={jsonLd}
    >
      <h1>Combien de temps conserver les données clients ?</h1>
      <p className="lead">
        Le RGPD interdit de garder les données « pour toujours, au cas où ». Chaque donnée a une durée de conservation
        liée à sa finalité. Voici les durées de référence pour une TPE, dans un tableau clair.
      </p>
      <p className="meta">Mis à jour : août 2026 · Lecture 4 min</p>

      <h2>Le principe : une durée par finalité</h2>
      <p>
        Vous conservez une donnée <strong>le temps nécessaire</strong> à la finalité pour laquelle elle a été
        collectée, puis vous la supprimez, l'anonymisez ou l'archivez si la loi l'exige. Ces durées doivent figurer
        dans votre <a href="/politique-confidentialite">politique de confidentialité</a>.
      </p>

      <h2>Tableau des durées de référence</h2>
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>Type de données</th>
              <th>Durée indicative</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([k, v]) => (
              <tr key={k}>
                <td>{k}</td>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="meta">
        Durées indicatives et courantes ; certaines varient selon votre secteur et vos obligations légales.
      </p>

      <h2>Les bonnes pratiques</h2>
      <ul>
        <li>Définir une durée pour <strong>chaque</strong> traitement de votre registre.</li>
        <li>Purger régulièrement les fichiers inactifs (prospects, anciens contacts).</li>
        <li>Distinguer la base active de l'archivage (accès restreint).</li>
        <li>Informer les personnes de ces durées.</li>
      </ul>

      <div className="cta-box">
        <h3>Des documents qui intègrent déjà les bonnes durées</h3>
        <p>
          RGPD Simple génère votre politique de confidentialité et votre registre avec des durées de conservation
          adaptées à votre activité. 97 €, livrés par email, sans avocat.
        </p>
        <a className="cta-btn" href="/#commande">Obtenir mes documents — 97 €</a>
        <p style={{ marginTop: '12px', marginBottom: 0, fontSize: '14px' }}>
          Voir aussi le <a href="/blog/guide-rgpd-tpe">guide RGPD complet</a>.
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

import { ContentLayout } from './ContentLayout'

const faq = [
  {
    q: 'Combien coûte une mise en conformité RGPD pour une TPE ?',
    a: "Cela va de 0 € (documents faits soi-même) à plus de 1 500 € (agence ou DPO externalisé). Pour une TPE ou un artisan, une solution clé en main comme RGPD Simple coûte 97 € en paiement unique pour les 5 documents essentiels personnalisés.",
  },
  {
    q: 'Faut-il payer un avocat pour être conforme au RGPD ?',
    a: "Non. La loi n'impose pas le recours à un avocat pour une activité standard. Un avocat (à partir de ~490 € par document) est utile pour des situations complexes ; pour la majorité des TPE, des documents personnalisés suffisent.",
  },
  {
    q: 'Un abonnement mensuel est-il nécessaire ?',
    a: "Non pour l'essentiel. Les solutions DPO ou logicielles facturent 200 à 2 000 €/mois. Pour une TPE, un pack de documents en paiement unique couvre les obligations fondamentales sans abonnement.",
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export function PrixPage() {
  return (
    <ContentLayout
      title="Combien coûte une mise en conformité RGPD ? (Prix 2026)"
      description="DIY gratuit, RGPD Simple à 97 €, avocat ou agence à 1 500 € et plus : le comparatif des prix pour mettre votre TPE en conformité RGPD en 2026."
      path="/prix"
      jsonLd={jsonLd}
    >
      <h1>Combien coûte une mise en conformité RGPD en 2026 ?</h1>
      <p className="lead">
        La conformité RGPD peut coûter de <strong>0 €</strong> (en la faisant vous-même) à plus de{' '}
        <strong>1 500 €</strong> (avec une agence ou un DPO). Pour une TPE ou un artisan, le bon rapport
        temps/prix/sécurité se situe autour de <strong>97 €</strong> pour un pack de documents personnalisés,
        sans avocat.
      </p>
      <p className="meta">Mis à jour : août 2026</p>

      <h2>Comparatif des prix (2026)</h2>
      <table>
        <thead>
          <tr>
            <th>Solution</th>
            <th>Prix</th>
            <th>Ce que vous obtenez</th>
            <th>Pour qui</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Le faire soi-même (modèles gratuits)</td>
            <td>0 €</td>
            <td>Modèles génériques à adapter, temps et risque d'erreurs</td>
            <td>Ceux qui ont le temps et des notions juridiques</td>
          </tr>
          <tr className="highlight-col">
            <td>RGPD Simple</td>
            <td>97 € (paiement unique)</td>
            <td>5 documents personnalisés + guide, livrés par email en quelques minutes</td>
            <td>TPE, artisans, indépendants qui veulent être en règle vite</td>
          </tr>
          <tr>
            <td>Avocat</td>
            <td>~490 € et plus / document</td>
            <td>Rédaction sur mesure par un professionnel du droit</td>
            <td>Situations juridiques complexes</td>
          </tr>
          <tr>
            <td>Agence / DPO externalisé</td>
            <td>1 500 – 5 000 € (ou 200 – 2 000 €/mois)</td>
            <td>Audit complet + accompagnement continu</td>
            <td>PME avec traitements sensibles ou à grande échelle</td>
          </tr>
        </tbody>
      </table>

      <h2>Pourquoi une telle différence de prix ?</h2>
      <p>
        La fourchette s'explique par le <strong>niveau d'accompagnement</strong>, pas par le niveau de conformité
        atteint. Pour une TPE avec une activité standard (un site, un formulaire de contact, un fichier clients,
        quelques cookies), les obligations sont les mêmes : une <a href="/politique-confidentialite">politique de
        confidentialité</a>, des <a href="/mentions-legales">mentions légales</a>, un <strong>registre des
        traitements</strong>, des <strong>CGV</strong> et un <a href="/cookies">bandeau cookies</a> conformes. Payer
        1 500 € pour ces documents standards n'a de sens que si votre situation est réellement complexe.
      </p>

      <h2>Que choisir selon votre situation ?</h2>
      <ul>
        <li>
          <strong>Vous démarrez / petit budget, un peu de temps :</strong> les modèles gratuits (CNIL) peuvent
          suffire, mais attention aux erreurs (durées de conservation, bandeau cookies non conforme…).
        </li>
        <li>
          <strong>TPE / artisan qui veut être en règle vite et sans risque :</strong> un pack de documents
          personnalisés à 97 € est le meilleur compromis.
        </li>
        <li>
          <strong>Données sensibles, gros volumes, profilage :</strong> l'accompagnement d'un avocat ou d'un DPO
          se justifie.
        </li>
      </ul>

      <div className="cta-box">
        <h3>Vos 5 documents RGPD pour 97 €, en quelques minutes</h3>
        <p>
          Politique de confidentialité, mentions légales, CGV, registre des traitements et bandeau cookies —
          personnalisés pour votre activité, livrés par email. Paiement unique, sans abonnement, sans avocat.
        </p>
        <a className="cta-btn" href="/#commande">Obtenir mes documents — 97 €</a>
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

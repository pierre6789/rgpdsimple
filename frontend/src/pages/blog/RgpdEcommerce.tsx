import { ContentLayout } from '../ContentLayout'

const faq = [
  {
    q: 'Quels documents sont obligatoires pour une boutique en ligne ?',
    a: "Des mentions légales, une politique de confidentialité, des CGV (obligatoires en vente aux consommateurs), un bandeau cookies conforme et un registre des traitements. Un e-commerce collecte beaucoup de données : ces documents sont incontournables.",
  },
  {
    q: 'Les CGV sont-elles obligatoires pour un e-commerce ?',
    a: "Oui. Pour toute vente à des consommateurs, les CGV sont obligatoires et doivent être communiquées avant la commande (prix, livraison, droit de rétractation, garanties, médiation).",
  },
  {
    q: 'Faut-il un consentement pour les cookies de retargeting et Analytics ?',
    a: "Oui. Les cookies de mesure d'audience et publicitaires (Google Analytics, pixel Meta, retargeting) ne peuvent être déposés qu'après le consentement de l'internaute, via un bandeau où refuser est aussi simple qu'accepter.",
  },
  {
    q: 'Dois-je mentionner Stripe, PayPal ou mes transporteurs ?',
    a: "Oui. Vos prestataires (paiement, hébergement, transporteurs, emailing) sont des destinataires/sous-traitants des données : ils doivent figurer dans votre politique de confidentialité, avec les transferts hors UE éventuels.",
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: "RGPD e-commerce : les documents obligatoires d'une boutique en ligne (2026)",
      description:
        "Boutique en ligne et RGPD : les documents obligatoires, la gestion des cookies et du tracking, les sous-traitants et la checklist de conformité.",
      inLanguage: 'fr-FR',
      image: ['https://www.rgpdsimple.fr/logo.png'],
      author: { '@id': 'https://www.rgpdsimple.fr/#organization' },
      publisher: { '@id': 'https://www.rgpdsimple.fr/#organization' },
      datePublished: '2026-08-23',
      dateModified: '2026-08-23',
      mainEntityOfPage: 'https://www.rgpdsimple.fr/blog/rgpd-ecommerce',
    },
    {
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
}

export function RgpdEcommerce() {
  return (
    <ContentLayout
      title="RGPD e-commerce : documents obligatoires (boutique en ligne)"
      description="Boutique en ligne et RGPD en 2026 : les documents obligatoires, la gestion des cookies et du tracking, les sous-traitants et la checklist de conformité."
      path="/blog/rgpd-ecommerce"
      jsonLd={jsonLd}
    >
      <h1>RGPD e-commerce : les documents obligatoires d'une boutique en ligne (2026)</h1>
      <p className="lead">
        Une boutique en ligne collecte plus de données que n'importe quel autre site : comptes clients, commandes,
        paiement, livraison, tracking marketing. C'est aussi l'un des profils les plus exposés aux contrôles. Voici
        exactement ce qu'il vous faut pour être en règle.
      </p>
      <p className="meta">Mis à jour : août 2026 · Lecture 6 min</p>

      <h2>Pourquoi l'e-commerce est particulièrement concerné</h2>
      <p>
        Un site marchand traite des données à chaque étape : création de compte, panier, adresse de livraison,
        paiement, emails de suivi, relances, publicité. Plus vous collectez, plus vos obligations d'information, de
        sécurité et de gestion du consentement sont visibles — et vérifiables.
      </p>

      <h2>Les documents obligatoires</h2>
      <ul>
        <li><strong>Mentions légales</strong> : identité du vendeur, SIRET, hébergeur, contact.</li>
        <li><strong>Politique de confidentialité</strong> : finalités (commande, compte, marketing), durées, droits, destinataires et transferts.</li>
        <li><strong>CGV</strong> : <strong>obligatoires</strong> en vente aux consommateurs — prix, livraison, droit de rétractation, garanties légales, médiation.</li>
        <li><strong>Bandeau cookies conforme</strong> : indispensable, l'e-commerce utilisant presque toujours de l'analytics et du retargeting.</li>
        <li><strong>Registre des traitements</strong> : clients, prospects, commandes, newsletter.</li>
      </ul>

      <h2>Cookies et tracking : le point le plus sensible</h2>
      <p>
        Analytics, pixel Meta, Google Ads, retargeting, A/B testing… ces traceurs ne peuvent se déclencher
        <strong> qu'après consentement</strong>. Le bandeau doit permettre de <strong>refuser aussi facilement que
        d'accepter</strong>, et aucun cookie non essentiel ne doit être posé avant le choix. C'est le premier motif de
        sanction de la CNIL — voir notre article sur le <a href="/blog/controle-cnil-2026">contrôle CNIL 2026</a>.
      </p>

      <h2>Sous-traitants et transferts hors UE</h2>
      <p>
        Vos prestataires traitent des données pour vous : Stripe ou PayPal (paiement), votre hébergeur, vos
        transporteurs, votre outil d'emailing, vos régies publicitaires. Ils doivent être identifiés dans la politique
        de confidentialité, et les transferts hors UE (souvent vers les États-Unis) encadrés (Data Privacy Framework
        ou clauses contractuelles types).
      </p>

      <h2>Durées de conservation et sécurité</h2>
      <ul>
        <li>Commandes / facturation : conservation liée aux obligations comptables (jusqu'à 10 ans).</li>
        <li>Comptes clients : tant que le compte est actif, puis archivage/suppression.</li>
        <li>Prospection : généralement 3 ans après le dernier contact.</li>
        <li>Sécurité : HTTPS, accès restreints, mots de passe robustes, sauvegardes.</li>
      </ul>

      <h2>Checklist e-commerce</h2>
      <ol>
        <li>Mentions légales + politique de confidentialité en ligne.</li>
        <li>CGV accessibles avant la commande.</li>
        <li>Bandeau cookies conforme (refus = accepter, rien avant consentement).</li>
        <li>Liste des sous-traitants et transferts dans la politique.</li>
        <li>Registre des traitements à jour.</li>
        <li>Durées de conservation + sécurité en place.</li>
      </ol>

      <div className="cta-box">
        <h3>Le pack complet pour votre boutique — dont les CGV et le bandeau cookies</h3>
        <p>
          RGPD Simple génère les 5 documents conformes CNIL, personnalisés pour votre e-commerce et livrés par email.
          24,99 €, paiement unique, sans avocat.
        </p>
        <a className="cta-btn" href="/#commande">Mettre ma boutique en règle — 24,99 €</a>
        <p style={{ marginTop: '12px', marginBottom: 0, fontSize: '14px' }}>
          Hésitation sur le budget ? Voir le <a href="/prix">comparatif des prix</a>.
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

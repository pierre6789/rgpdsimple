import { ContentLayout } from '../ContentLayout'
import { METIER_LINKS } from './metiers'

const faq = [
  {
    q: 'Le RGPD est-il obligatoire pour une TPE ?',
    a: "Oui. Le RGPD s'applique à toute organisation qui traite des données personnelles, sans seuil de taille ni de chiffre d'affaires. Une TPE, un artisan ou un indépendant y est soumis dès qu'il gère un fichier clients, un formulaire ou des cookies.",
  },
  {
    q: 'Quels sont les documents RGPD obligatoires ?',
    a: "Une politique de confidentialité, des mentions légales, un registre des traitements, un bandeau cookies conforme (si votre site utilise des traceurs) et des CGV si vous vendez. Ce sont les fondations de la conformité d'une TPE.",
  },
  {
    q: 'Combien coûte une mise en conformité RGPD ?',
    a: "De 0 € en faisant tout soi-même (long et risqué) à plus de 1 500 € via une agence, en passant par ~490 € chez un avocat. Un pack clé en main comme RGPD Simple coûte 97 € et couvre les 5 documents essentiels.",
  },
  {
    q: 'Faut-il un DPO en TPE ?',
    a: "Non, dans la quasi-totalité des cas. Le délégué à la protection des données n'est obligatoire que pour le suivi à grande échelle ou les données sensibles à grande échelle, ce qui ne concerne pas une activité classique de TPE.",
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Guide RGPD pour les TPE en 2026 : obligations, documents, étapes',
      description:
        "Le guide complet du RGPD pour les TPE, artisans et indépendants : qui est concerné, les documents obligatoires, les étapes de mise en conformité et les coûts.",
      inLanguage: 'fr-FR',
      author: { '@type': 'Organization', name: 'RGPD Simple' },
      publisher: { '@type': 'Organization', name: 'RGPD Simple', logo: { '@type': 'ImageObject', url: 'https://www.rgpdsimple.fr/logo.png' } },
      datePublished: '2026-08-23',
      dateModified: '2026-08-23',
      mainEntityOfPage: 'https://www.rgpdsimple.fr/blog/guide-rgpd-tpe',
    },
    {
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
}

export function GuideRgpdTpe() {
  return (
    <ContentLayout
      title="Guide RGPD TPE 2026 : obligations, documents, étapes"
      description="Le guide complet du RGPD pour les TPE, artisans et indépendants en 2026 : qui est concerné, les documents obligatoires, les étapes de mise en conformité et les coûts."
      path="/blog/guide-rgpd-tpe"
      jsonLd={jsonLd}
    >
      <h1>Guide RGPD pour les TPE en 2026 : obligations, documents et étapes</h1>
      <p className="lead">
        Ce guide rassemble tout ce qu'une TPE, un artisan ou un indépendant doit savoir sur le RGPD : qui est
        concerné, quels documents sont obligatoires, comment se mettre en conformité étape par étape, et combien ça
        coûte. Sans jargon, à jour des règles 2026.
      </p>
      <p className="meta">Mis à jour : août 2026 · Lecture 8 min</p>

      <h2>Le RGPD en deux minutes</h2>
      <p>
        Le RGPD (Règlement général sur la protection des données) encadre la manière dont vous collectez et utilisez
        les <strong>données personnelles</strong> : nom, email, téléphone, adresse, mais aussi cookies et images. Il
        repose sur quelques principes simples : ne collecter que le nécessaire, informer les personnes, sécuriser les
        données, définir des durées de conservation et respecter leurs droits.
      </p>

      <h2>Qui est concerné ?</h2>
      <p>
        Tout le monde ou presque. Le RGPD ne prévoit <strong>aucun seuil</strong> de taille ou de chiffre d'affaires :
        un formulaire de contact, un fichier clients ou de simples cookies suffisent. Pour savoir précisément si vous
        êtes concerné, voir notre article dédié :{' '}
        <a href="/blog/rgpd-obligatoire-pour-qui">le RGPD est-il obligatoire pour vous ?</a>
      </p>

      <h2>Les 5 documents indispensables</h2>
      <ol>
        <li><strong>Politique de confidentialité</strong> : informe les personnes (finalités, durées, droits, destinataires).</li>
        <li><strong>Mentions légales</strong> : identité de l'éditeur, hébergeur, contact.</li>
        <li><strong>Registre des traitements</strong> : la liste de vos traitements (version simplifiée pour une TPE).</li>
        <li><strong>Bandeau cookies conforme</strong> : refus aussi simple que l'acceptation, rien avant consentement.</li>
        <li><strong>CGV</strong> : obligatoires si vous vendez à des consommateurs.</li>
      </ol>

      <h2>Les 6 étapes pour se mettre en conformité</h2>
      <ol>
        <li>Recensez vos traitements (qui, quelles données, pourquoi) dans un registre simplifié.</li>
        <li>Rédigez et publiez votre politique de confidentialité et vos mentions légales.</li>
        <li>Mettez en place un bandeau cookies conforme si vous utilisez des traceurs.</li>
        <li>Définissez des durées de conservation et supprimez ce qui est inutile.</li>
        <li>Sécurisez les accès (mots de passe, HTTPS, sauvegardes).</li>
        <li>Préparez la réponse aux droits (accès, effacement, opposition).</li>
      </ol>

      <h2>Cookies et consentement</h2>
      <p>
        Si votre site utilise Google Analytics, un pixel Meta ou tout traceur non essentiel, ils ne doivent se
        déclencher qu'<strong>après le consentement</strong> de l'internaute. C'est le premier motif de sanction de la
        CNIL — détails dans notre article{' '}
        <a href="/blog/controle-cnil-2026">Contrôle CNIL 2026</a>.
      </p>

      <h2>Combien ça coûte ?</h2>
      <p>
        Se mettre en conformité peut coûter de 0 € (tout faire soi-même, long et risqué) à plus de 1 500 € via une
        agence. Un pack clé en main se situe autour de 97 €. Nous détaillons chaque option dans le{' '}
        <a href="/prix">comparatif des prix de la conformité RGPD</a>.
      </p>

      <h2>Guides par métier</h2>
      <p>Des obligations concrètes, adaptées à votre activité :</p>
      <ul>
        {METIER_LINKS.map((m) => (
          <li key={m.path}>
            <a href={m.path}>{m.title}</a>
          </li>
        ))}
      </ul>

      <h2>Guides par situation</h2>
      <ul>
        <li><a href="/blog/rgpd-auto-entrepreneur">RGPD auto-entrepreneur : vos obligations</a></li>
        <li><a href="/blog/rgpd-ecommerce">RGPD e-commerce : les documents obligatoires d'une boutique</a></li>
      </ul>

      <div className="cta-box">
        <h3>Passez à l'action en quelques minutes</h3>
        <p>
          RGPD Simple génère vos 5 documents conformes CNIL, personnalisés pour votre activité et livrés par email.
          97 €, paiement unique, sans avocat.
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

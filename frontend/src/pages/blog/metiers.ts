// Données des articles « RGPD par métier ». Structure commune (rendue par
// MetierArticle) mais contenu unique par métier (données spécifiques, risques,
// FAQ) — pas de contenu dupliqué. Ajouter un métier = ajouter une entrée ici
// + la route dans App.tsx + prerender.mjs + le sitemap.

export type Metier = {
  slug: string // ex. 'rgpd-coiffeur'
  title: string // <title> de la page
  description: string // meta description
  h1: string
  lead: string
  concerned: string
  dataTitle: string
  dataPoints: string[]
  risk: string
  faq: { q: string; a: string }[]
}

export const METIERS: Metier[] = [
  {
    slug: 'rgpd-coiffeur',
    title: 'RGPD coiffeur & salon de beauté : vos obligations (2026)',
    description:
      'Salon de coiffure, barbier, institut : quelles données vous traitez, vos obligations RGPD, le cas des SMS de rappel, de la fidélité et des photos avant/après.',
    h1: 'RGPD pour les coiffeurs et salons de beauté : ce que vous devez faire',
    lead: "Fichier clients, rappels de rendez-vous par SMS, carte de fidélité, photos avant/après : un salon manipule bien plus de données personnelles qu'il n'y paraît. Voici vos obligations, simplement.",
    concerned:
      "Dès que vous notez le nom et le numéro d'un client pour un rendez-vous ou une fidélité, vous traitez des données personnelles et le RGPD s'applique. Certaines informations (allergies, réactions du cuir chevelu, soins liés à la santé) sont même des données sensibles, plus protégées.",
    dataTitle: 'Les données que traite un salon',
    dataPoints: [
      'Coordonnées clients (nom, téléphone, email) et historique des prestations.',
      'Prise de rendez-vous en ligne ou par téléphone.',
      'Programme de fidélité et offres personnalisées.',
      'SMS / emails de rappel et de relance.',
      'Photos « avant / après » (image de la personne = donnée personnelle).',
      'Éventuelles informations de santé (allergies, sensibilités) = données sensibles.',
    ],
    risk:
      "Les points sensibles en salon : envoyer des SMS ou emails marketing sans consentement préalable, publier des photos de clients sur Instagram sans accord écrit, et conserver indéfiniment un fichier clients inactif. La prospection par SMS/email suppose le consentement ; le rappel de rendez-vous lié à une prestation, non.",
    faq: [
      {
        q: 'Puis-je envoyer des SMS de promotion à mes clients ?',
        a: "Pour de la prospection commerciale (promotions, offres), il faut le consentement préalable du client. En revanche, un simple rappel de rendez-vous lié à une prestation en cours ne nécessite pas de consentement marketing.",
      },
      {
        q: "Ai-je le droit de publier les photos de mes clients ?",
        a: "L'image d'une personne est une donnée personnelle : publier une photo « avant/après » sur vos réseaux nécessite l'accord (idéalement écrit) de la personne, révocable à tout moment.",
      },
      {
        q: 'Combien de temps garder le fichier clients ?',
        a: "Tant que la relation est active, puis en général 3 ans après le dernier rendez-vous pour la prospection. Les données de facturation se conservent plus longtemps (obligations comptables).",
      },
    ],
  },
  {
    slug: 'rgpd-restaurant',
    title: 'RGPD restaurant : réservations, wifi, fidélité (2026)',
    description:
      "Restaurant, café, bar : RGPD des réservations, du wifi client, de la fidélité, des avis et de la vidéosurveillance. Vos obligations et la checklist.",
    h1: 'RGPD pour les restaurants : réservations, wifi et fidélité',
    lead: "Réservations, wifi offert, programme de fidélité, vidéosurveillance, avis en ligne : un restaurant collecte des données à plusieurs endroits. Voici comment être en règle sans se compliquer la vie.",
    concerned:
      "Prendre une réservation avec un nom et un numéro, proposer un wifi client ou une carte de fidélité : tout cela relève du RGPD. La vidéosurveillance ajoute des obligations spécifiques d'information et de durée de conservation.",
    dataTitle: 'Les données que traite un restaurant',
    dataPoints: [
      'Réservations : nom, téléphone, email, nombre de couverts, éventuelles préférences.',
      'Wifi client via portail captif (email, identifiants de connexion).',
      'Programme de fidélité et offres.',
      'Avis clients et réponses.',
      'Vidéosurveillance (images = données personnelles).',
      'Livraison / click & collect : adresses et coordonnées.',
    ],
    risk:
      "Les points sensibles : la vidéosurveillance (information obligatoire par panneau, durée de conservation limitée — souvent un mois maximum, accès restreint), le wifi captif qui collecte des emails souvent réutilisés en marketing sans consentement, et l'exploitation du fichier de réservation à des fins publicitaires.",
    faq: [
      {
        q: 'La vidéosurveillance de mon restaurant est-elle soumise au RGPD ?',
        a: "Oui. Vous devez informer par un panneau visible, limiter la durée de conservation des images (souvent un mois maximum), restreindre l'accès et ne filmer que les zones justifiées (pas en continu les postes des salariés sans motif).",
      },
      {
        q: "Puis-je utiliser les emails collectés via le wifi pour ma newsletter ?",
        a: "Seulement avec le consentement explicite des clients pour la prospection. Collecter un email pour donner l'accès au wifi ne vaut pas consentement à recevoir de la publicité.",
      },
      {
        q: 'Dois-je conserver les réservations longtemps ?',
        a: "Non, uniquement le temps utile à la gestion des réservations, puis suppression ou archivage. Seules les données de facturation obéissent à des durées comptables plus longues.",
      },
    ],
  },
  {
    slug: 'rgpd-artisan-btp',
    title: 'RGPD artisan du bâtiment (BTP) : obligations 2026',
    description:
      'Artisan du BTP, plombier, électricien, maçon : RGPD des devis, de la prospection, des sous-traitants et des photos de chantier. Vos obligations, simplement.',
    h1: "RGPD pour les artisans du bâtiment : ce que la CNIL attend",
    lead: "Devis, factures, prospection, photos de chantier, sous-traitants : même sans site marchand, un artisan du BTP traite de nombreuses données personnelles. Voici l'essentiel pour être en règle.",
    concerned:
      "Établir un devis avec les coordonnées et l'adresse d'un client, démarcher des particuliers, partager des informations avec des sous-traitants : autant de traitements de données soumis au RGPD, que vous ayez un site internet ou non.",
    dataTitle: 'Les données que traite un artisan',
    dataPoints: [
      'Devis et factures : nom, coordonnées, adresse du chantier.',
      'Prospection commerciale (particuliers et professionnels).',
      'Coordonnées partagées avec fournisseurs et sous-traitants.',
      'Photos de chantier (peuvent montrer des biens, parfois des personnes).',
      'Prise de rendez-vous et suivi client.',
      "Éventuelles données de salariés si vous employez.",
    ],
    risk:
      "Les points sensibles : la prospection de particuliers (démarchage encadré, consentement pour l'email/SMS, respect de Bloctel au téléphone), le partage des coordonnées client avec des sous-traitants sans information, et la conservation des devis non aboutis au-delà du nécessaire.",
    faq: [
      {
        q: "Le RGPD s'applique-t-il si je n'ai pas de site internet ?",
        a: "Oui. Le RGPD concerne tout traitement de données personnelles : un simple fichier de devis, de clients ou de prospects sur votre ordinateur ou téléphone suffit à être concerné.",
      },
      {
        q: 'Puis-je démarcher des particuliers pour proposer mes services ?',
        a: "Le démarchage est encadré : la prospection par email ou SMS suppose en principe le consentement, et le démarchage téléphonique doit respecter la liste d'opposition Bloctel. La prospection entre professionnels est plus souple.",
      },
      {
        q: 'Combien de temps conserver les devis et factures ?',
        a: "Les factures relèvent des obligations comptables (jusqu'à 10 ans). Les devis non signés ne doivent pas être conservés indéfiniment : limitez-les à la durée utile, puis supprimez.",
      },
    ],
  },
  {
    slug: 'rgpd-photographe',
    title: 'RGPD photographe : droit à l’image et données (2026)',
    description:
      'Photographe professionnel : RGPD des galeries clients, du droit à l’image, du portfolio et de la conservation des photos. Vos obligations et la checklist.',
    h1: 'RGPD pour les photographes : droit à l’image et données clients',
    lead: "Galeries clients en ligne, portraits, mariages, portfolio : le photographe cumule données personnelles et droit à l'image. Deux régimes à respecter en même temps. Voici comment vous mettre en règle.",
    concerned:
      "Une photographie identifiant une personne est une donnée personnelle : le RGPD s'applique, en plus du droit à l'image. Vous traitez aussi les coordonnées de vos clients, leurs galeries privées et vos livraisons de fichiers.",
    dataTitle: 'Les données que traite un photographe',
    dataPoints: [
      "Coordonnées clients et contrats de prestation.",
      'Photographies de personnes (donnée personnelle + droit à l’image).',
      'Galeries clients en ligne (accès privé, mots de passe).',
      'Portfolio et publication sur site / réseaux sociaux.',
      'Stockage et sauvegarde des fichiers livrés.',
      'Paiement et facturation.',
    ],
    risk:
      "Les points sensibles : publier des photos de clients ou de modèles dans votre portfolio sans autorisation (droit à l'image ET RGPD), conserver les galeries clients sans limite de durée, et l'absence d'information des personnes photographiées lors d'événements (mariages, entreprises).",
    faq: [
      {
        q: "Le consentement au droit à l'image suffit-il pour le RGPD ?",
        a: "Ce sont deux régimes distincts. L'autorisation de droit à l'image encadre la diffusion ; le RGPD encadre le traitement des données (finalité, durée, sécurité, droits). Il faut respecter les deux, idéalement via un contrat clair.",
      },
      {
        q: 'Puis-je utiliser les photos de mes clients dans mon portfolio ?',
        a: "Seulement avec leur autorisation (image) et une information conforme (RGPD). Prévoyez une clause dédiée dans votre contrat, distincte de la prestation, et révocable.",
      },
      {
        q: 'Combien de temps garder les galeries et fichiers clients ?',
        a: "Définissez une durée (ex. accès à la galerie limité dans le temps, archivage ensuite) et communiquez-la. Les données de facturation obéissent à des durées comptables spécifiques.",
      },
    ],
  },
]

export const METIER_LINKS = METIERS.map((m) => ({
  path: `/blog/${m.slug}`,
  title: m.h1,
  description: m.description,
}))

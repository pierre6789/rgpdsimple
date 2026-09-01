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
  {
    slug: 'rgpd-garage-automobile',
    title: 'RGPD garage automobile : clients & véhicules (2026)',
    description:
      'Garage, carrosserie, centre auto : RGPD du fichier clients, des données véhicules, des rappels d’entretien par SMS et de la vidéosurveillance. Vos obligations.',
    h1: 'RGPD pour les garages automobiles : vos obligations',
    lead: "Fiches clients, historique des véhicules, rappels d'entretien par SMS, vidéosurveillance de l'atelier : un garage traite plus de données qu'on ne l'imagine. Voici l'essentiel pour être en règle.",
    concerned:
      "Dès que vous enregistrez un client, son véhicule et l'historique des interventions, vous traitez des données personnelles. La plaque d'immatriculation est d'ailleurs considérée comme une donnée à caractère personnel indirecte.",
    dataTitle: 'Les données que traite un garage',
    dataPoints: [
      'Coordonnées clients et historique des interventions.',
      'Données véhicule (immatriculation, VIN, kilométrage) rattachées au client.',
      "Rendez-vous, devis et factures.",
      "Rappels d'entretien / de contrôle technique par SMS ou email.",
      "Vidéosurveillance de l'atelier et de l'accueil.",
      'Paiement.',
    ],
    risk:
      "Les points sensibles : distinguer le rappel d'entretien lié au service (admis) de la prospection commerciale (consentement requis), l'immatriculation comme donnée personnelle, et la vidéosurveillance (panneau d'information, durée limitée souvent à un mois, accès restreint).",
    faq: [
      {
        q: "Puis-je envoyer des SMS de rappel d'entretien à mes clients ?",
        a: "Un rappel lié à un entretien ou un contrôle technique en cours peut relever du service. En revanche, une offre commerciale (promotion pneus, etc.) est de la prospection et suppose le consentement du client.",
      },
      {
        q: "La plaque d'immatriculation est-elle une donnée personnelle ?",
        a: "Oui, elle est considérée comme une donnée à caractère personnel indirecte car elle permet, recoupée, d'identifier une personne. Elle doit être traitée avec les mêmes précautions.",
      },
      {
        q: 'Combien de temps conserver le fichier clients ?',
        a: "Le temps de la relation, puis en général 3 ans après la dernière intervention pour la prospection. Les factures suivent les durées comptables (jusqu'à 10 ans).",
      },
    ],
  },
  {
    slug: 'rgpd-commerce',
    title: 'RGPD commerce de proximité : fidélité, caisse, wifi (2026)',
    description:
      'Boutique, commerce de proximité : RGPD de la carte de fidélité, de l’encaissement, du ticket par email, du wifi et de la vidéosurveillance. Vos obligations.',
    h1: 'RGPD pour les commerces de proximité : ce qu’il faut savoir',
    lead: "Carte de fidélité, ticket de caisse dématérialisé, wifi client, vidéosurveillance : même un commerce physique collecte des données personnelles. Voici comment être en règle simplement.",
    concerned:
      "Proposer une carte de fidélité, envoyer le ticket par email ou installer une caméra, c'est traiter des données personnelles. Le RGPD s'applique, même sans site marchand.",
    dataTitle: 'Les données que traite un commerce',
    dataPoints: [
      'Programme de fidélité (coordonnées, historique d’achats, points).',
      'Encaissement et éventuel ticket de caisse dématérialisé (email).',
      'Wifi client (portail captif).',
      'Vidéosurveillance du magasin.',
      'Click & collect / réservation.',
      'Prospection et offres personnalisées.',
    ],
    risk:
      "Les points sensibles : l'email collecté pour le ticket ou le wifi ne vaut pas consentement à la publicité, le profilage des achats via la fidélité doit être transparent, et la vidéosurveillance obéit à des règles strictes (information, durée, zones filmées).",
    faq: [
      {
        q: "Puis-je utiliser l'email du ticket de caisse pour ma newsletter ?",
        a: "Non, pas sans consentement distinct. Collecter un email pour envoyer un ticket dématérialisé ne vaut pas accord pour recevoir de la publicité : il faut une case de consentement séparée.",
      },
      {
        q: 'Ma carte de fidélité est-elle soumise au RGPD ?',
        a: "Oui. Vous devez informer sur les données collectées et leur usage (notamment le profilage des achats), permettre l'accès et l'effacement, et ne conserver les données que le temps utile.",
      },
      {
        q: 'Quelles règles pour la vidéosurveillance en boutique ?',
        a: "Informer par un panneau visible, ne filmer que les zones justifiées (pas les clients en continu sans motif ni les postes des salariés), limiter la durée (souvent un mois) et restreindre l'accès aux images.",
      },
    ],
  },
  {
    slug: 'rgpd-consultant',
    title: 'RGPD consultant & freelance : vos obligations (2026)',
    description:
      'Consultant, freelance, prestataire B2B : RGPD du CRM, de la prospection, des contrats et de la sous-traitance de données. Vos obligations, simplement.',
    h1: 'RGPD pour les consultants et freelances',
    lead: "CRM de prospects, prospection LinkedIn/email, contrats, et parfois accès aux données des clients de vos clients : le consultant a un profil de données bien particulier. Voici l'essentiel.",
    concerned:
      "Gérer un fichier de prospects, prospecter, signer des contrats : autant de traitements soumis au RGPD. Et si vous traitez des données pour le compte d'un client, vous devenez son sous-traitant, avec des obligations propres.",
    dataTitle: 'Les données que traite un consultant',
    dataPoints: [
      'CRM : prospects et contacts professionnels.',
      'Prospection par email, LinkedIn ou téléphone.',
      'Contrats, propositions commerciales, facturation.',
      'Newsletter / contenu.',
      "Données traitées pour le compte de clients (rôle de sous-traitant).",
    ],
    risk:
      "Les points sensibles : la prospection B2B (plus souple mais encadrée : objet professionnel, droit d'opposition), la tenue d'un CRM (information, durées), et surtout le rôle de sous-traitant quand vous manipulez les données d'un client — un contrat de sous-traitance (DPA) est alors nécessaire.",
    faq: [
      {
        q: 'Puis-je prospecter des professionnels par email ?',
        a: "La prospection B2B est admise si le message est en lien avec la fonction professionnelle du destinataire, avec information et possibilité de s'opposer à tout moment. Le B2C, lui, exige un consentement préalable.",
      },
      {
        q: 'Suis-je responsable ou sous-traitant des données ?',
        a: "Pour vos propres prospects/clients, vous êtes responsable de traitement. Quand vous traitez des données pour le compte d'un client (ex. sa base d'utilisateurs), vous êtes son sous-traitant : un contrat (DPA) doit encadrer cette relation.",
      },
      {
        q: 'Combien de temps garder mon CRM ?',
        a: "Les prospects sont généralement conservés 3 ans après le dernier contact. Au-delà, il faut supprimer ou anonymiser, sauf relation commerciale active.",
      },
    ],
  },
  {
    slug: 'rgpd-sante-bien-etre',
    title: 'RGPD santé & bien-être : données sensibles (2026)',
    description:
      'Praticien bien-être, paramédical, thérapeute : RGPD des données de santé (sensibles), des fiches clients, des rendez-vous et de la confidentialité. Vos obligations.',
    h1: 'RGPD santé & bien-être : le cas des données sensibles',
    lead: "Fiches clients, notes de séance, antécédents : les métiers du bien-être et paramédicaux manipulent souvent des données de santé, considérées comme sensibles et donc plus protégées. Voici ce que cela implique.",
    concerned:
      "Dès que vous notez des informations touchant à la santé (douleurs, antécédents, traitements), vous traitez des données sensibles au sens du RGPD : leur traitement est en principe interdit sauf exceptions (consentement explicite, prise en charge). Les précautions sont renforcées.",
    dataTitle: 'Les données que traite un praticien',
    dataPoints: [
      'Coordonnées clients et rendez-vous.',
      'Fiches et notes de séance (souvent des données de santé = sensibles).',
      'Antécédents, allergies, informations transmises par le client.',
      'Paiement et facturation.',
      'Éventuels échanges (email, messagerie).',
    ],
    risk:
      "Les points sensibles : les données de santé exigent une base légale renforcée (consentement explicite ou prise en charge), une sécurité accrue (accès strictement limité, chiffrement) et, pour les professionnels de santé réglementés, un hébergement certifié HDS si les données sont hébergées par un tiers. Le secret s'ajoute au RGPD.",
    faq: [
      {
        q: 'Les données de santé sont-elles traitées différemment ?',
        a: "Oui. Ce sont des données « sensibles » : leur traitement est en principe interdit sauf exception (consentement explicite, prise en charge). Elles imposent une sécurité renforcée et un accès strictement limité.",
      },
      {
        q: 'Dois-je utiliser un hébergement HDS ?',
        a: "Si vous êtes un professionnel de santé et que des données de santé sont hébergées par un prestataire tiers, celui-ci doit en principe être certifié « Hébergeur de Données de Santé » (HDS). Pour un simple carnet local, cette obligation ne s'applique pas de la même manière.",
      },
      {
        q: 'Combien de temps conserver les fiches clients ?',
        a: "Le temps du suivi, puis un archivage limité et sécurisé. Les données ne doivent pas être conservées indéfiniment ; définissez une durée et sécurisez l'accès.",
      },
    ],
  },
  {
    slug: 'rgpd-agence-immobiliere',
    title: 'RGPD agence immobilière : obligations & fichiers (2026)',
    description:
      'Agence immobilière : RGPD des fichiers acquéreurs/locataires, des pièces justificatives (ID, avis d’imposition), de la prospection et des durées. Vos obligations.',
    h1: 'RGPD pour les agences immobilières',
    lead: "Fichiers acquéreurs, vendeurs et locataires, pièces justificatives sensibles, prospection, portails d'annonces : l'immobilier est un secteur très exposé au RGPD. Voici l'essentiel.",
    concerned:
      "Vous collectez des données identifiantes et parfois très sensibles (pièces d'identité, avis d'imposition, bulletins de salaire). Le principe de minimisation et les durées de conservation sont ici particulièrement surveillés par la CNIL.",
    dataTitle: 'Les données que traite une agence',
    dataPoints: [
      'Fichiers acquéreurs, vendeurs, locataires (coordonnées, critères).',
      "Pièces justificatives (identité, avis d'imposition, bulletins de salaire).",
      'Mandats, visites, offres.',
      'Prospection et estimation.',
      'Partage avec notaires, banques, diagnostiqueurs.',
    ],
    risk:
      "Les points sensibles : la collecte des pièces justificatives doit être minimisée (ne demander que le nécessaire, ne pas conserver les copies au-delà de l'utile), les candidatures locatives non retenues doivent être supprimées rapidement, et la prospection doit respecter le consentement.",
    faq: [
      {
        q: 'Puis-je conserver les pièces des candidats non retenus ?',
        a: "Non, au-delà du nécessaire. Les dossiers des candidats locataires non retenus doivent être supprimés rapidement après la décision. Ne conservez que le dossier du candidat retenu, le temps du bail et des obligations légales.",
      },
      {
        q: 'Quelles pièces ai-je le droit de demander ?',
        a: "Uniquement celles autorisées et nécessaires (principe de minimisation). Certaines pièces sont interdites à la demande ; limitez-vous au strict utile et informez sur leur usage et leur durée de conservation.",
      },
      {
        q: 'Dois-je informer sur le partage avec notaires et banques ?',
        a: "Oui. Ces destinataires doivent figurer dans votre information (politique de confidentialité), en précisant la finalité du partage.",
      },
    ],
  },
  {
    slug: 'rgpd-coach',
    title: 'RGPD coach & thérapeute : notes de séance, avis (2026)',
    description:
      'Coach, thérapeute, praticien : RGPD des notes de séance, des rendez-vous, des témoignages clients et de la prospection. Vos obligations, sans jargon.',
    h1: 'RGPD pour les coachs et thérapeutes',
    lead: "Notes de séance parfois intimes, rendez-vous, témoignages clients, newsletter : l'accompagnement personnel implique des données souvent sensibles. Voici comment être en règle.",
    concerned:
      "Vos notes de séance peuvent contenir des informations très personnelles, parfois liées à la santé psychique — donc sensibles. Le RGPD impose alors une base légale claire, une sécurité renforcée et une grande discrétion.",
    dataTitle: 'Les données que traite un coach',
    dataPoints: [
      'Coordonnées clients et rendez-vous.',
      'Notes de séance (parfois des données sensibles).',
      'Objectifs, suivi, échanges.',
      'Témoignages et avis publiés.',
      'Newsletter / prospection.',
    ],
    risk:
      "Les points sensibles : les notes de séance à caractère psychologique sont sensibles (sécurité et accès renforcés), la publication de témoignages nommant un client exige son consentement, et la prospection suppose l'accord préalable.",
    faq: [
      {
        q: 'Puis-je publier les témoignages de mes clients ?',
        a: "Seulement avec leur consentement, surtout si le témoignage est nominatif ou révèle des informations personnelles. Le consentement doit être libre et révocable.",
      },
      {
        q: 'Mes notes de séance sont-elles des données sensibles ?',
        a: "Souvent oui, dès qu'elles touchent à la santé psychique ou à la vie privée. Elles imposent une sécurité renforcée : accès strictement personnel, support protégé, durée de conservation limitée.",
      },
      {
        q: 'Puis-je envoyer une newsletter à mes clients ?',
        a: "Pour de la prospection, il faut le consentement. Un message strictement lié à l'accompagnement en cours relève, lui, de la relation de service.",
      },
    ],
  },
  {
    slug: 'rgpd-auto-ecole',
    title: 'RGPD auto-école : élèves, mineurs, plateforme (2026)',
    description:
      'Auto-école : RGPD des données élèves, des mineurs, du NEPH, de la plateforme e-learning et de la progression. Vos obligations, simplement.',
    h1: 'RGPD pour les auto-écoles',
    lead: "Dossiers élèves, mineurs, numéro NEPH, plateforme de code en ligne, suivi de progression : l'auto-école traite beaucoup de données, dont celles de mineurs. Voici l'essentiel.",
    concerned:
      "Inscrire un élève, suivre sa progression, gérer son dossier de permis : ce sont des traitements soumis au RGPD. La présence fréquente de mineurs impose des précautions supplémentaires (information adaptée, consentement du représentant légal).",
    dataTitle: 'Les données que traite une auto-école',
    dataPoints: [
      'Identité et coordonnées des élèves (souvent mineurs).',
      'Numéro NEPH, dossier de permis, pièces justificatives.',
      'Progression, résultats, planning des leçons.',
      'Comptes et données de connexion à la plateforme de code en ligne.',
      'Paiement et facturation.',
    ],
    risk:
      "Les points sensibles : les données de mineurs (information claire, accord du représentant légal), la minimisation des pièces justificatives, la durée de conservation des dossiers après l'obtention du permis, et la sécurité de la plateforme e-learning.",
    faq: [
      {
        q: 'Quelles précautions pour les élèves mineurs ?',
        a: "Une information adaptée et, selon les cas, l'accord du représentant légal. Les données de mineurs bénéficient d'une protection renforcée : minimisation et durée strictement nécessaire.",
      },
      {
        q: 'Combien de temps garder les dossiers élèves ?',
        a: "Le temps de la formation et des obligations légales, puis suppression ou archivage. Ne conservez pas les dossiers indéfiniment après l'obtention du permis.",
      },
      {
        q: 'La plateforme de code en ligne est-elle concernée ?',
        a: "Oui. Les comptes et données de connexion sont des données personnelles : informez les élèves, sécurisez les accès et vérifiez les conditions de votre prestataire (sous-traitant).",
      },
    ],
  },
  {
    slug: 'rgpd-expert-comptable',
    title: 'RGPD expert-comptable : sous-traitance & paie (2026)',
    description:
      'Expert-comptable, cabinet comptable : RGPD du rôle de sous-traitant, des données de paie, de la sécurité et des durées légales. Vos obligations.',
    h1: 'RGPD pour les experts-comptables',
    lead: "Comptabilité, paie, données fiscales de vos clients et de leurs salariés : le cabinet comptable manipule des données nombreuses et sensibles, souvent en tant que sous-traitant. Voici l'essentiel.",
    concerned:
      "Pour vos propres clients, vous êtes responsable de traitement. Mais quand vous traitez la paie ou la compta pour le compte d'un client, vous êtes son sous-traitant : un contrat (DPA) est obligatoire, avec des exigences de sécurité et de confidentialité élevées.",
    dataTitle: 'Les données que traite un cabinet',
    dataPoints: [
      'Données clients (coordonnées, comptes, fiscalité).',
      'Données de paie : salariés des clients (parfois données sensibles).',
      'Pièces comptables et justificatifs.',
      'Portail client et échanges de documents.',
      "Sous-traitants du cabinet (logiciels, hébergeurs).",
    ],
    risk:
      "Les points sensibles : formaliser le rôle de sous-traitant par un contrat (DPA) avec chaque client, sécuriser fortement les accès (données de paie et fiscales), respecter les durées légales de conservation, et encadrer vos propres sous-traitants (logiciels, hébergement).",
    faq: [
      {
        q: 'Suis-je responsable ou sous-traitant des données ?',
        a: "Les deux, selon les traitements. Pour votre gestion interne (vos clients), vous êtes responsable. Pour la paie ou la compta réalisée pour un client, vous êtes son sous-traitant : un contrat de sous-traitance (DPA) est requis.",
      },
      {
        q: 'Un contrat de sous-traitance (DPA) est-il obligatoire ?',
        a: "Oui, dès que vous traitez des données pour le compte d'un client. Ce contrat encadre les instructions, la sécurité, la confidentialité et le sort des données en fin de mission.",
      },
      {
        q: 'Combien de temps conserver les données comptables ?',
        a: "Selon les obligations légales et fiscales (souvent jusqu'à 10 ans pour les pièces comptables). Au-delà, les données doivent être supprimées ou archivées de façon sécurisée.",
      },
    ],
  },
  {
    slug: 'rgpd-avocat',
    title: 'RGPD avocat : secret professionnel & dossiers (2026)',
    description:
      'Avocat, cabinet juridique : RGPD des dossiers clients, des données sensibles et judiciaires, du secret professionnel et de la sécurité. Vos obligations.',
    h1: 'RGPD pour les avocats',
    lead: "Dossiers clients, données parfois judiciaires ou sensibles, secret professionnel : le cabinet d'avocat cumule le RGPD et des obligations déontologiques fortes. Voici comment les articuler.",
    concerned:
      "Vos dossiers contiennent des données personnelles, souvent sensibles voire relatives à des infractions ou condamnations, dont le traitement est strictement encadré. Le RGPD s'ajoute au secret professionnel, sans le remplacer.",
    dataTitle: 'Les données que traite un cabinet',
    dataPoints: [
      'Identité et coordonnées des clients.',
      'Dossiers : données parfois sensibles, judiciaires ou relatives à des infractions.',
      'Pièces de procédure et échanges.',
      'Facturation et comptabilité.',
      "Sous-traitants (logiciels métier, hébergement, archivage).",
    ],
    risk:
      "Les points sensibles : les données relatives aux infractions et condamnations sont soumises à un régime strict (art. 10 RGPD), la sécurité et la confidentialité doivent être renforcées (le secret professionnel s'ajoute au RGPD), et les durées de conservation des dossiers doivent être définies.",
    faq: [
      {
        q: 'Le RGPD prime-t-il sur le secret professionnel ?',
        a: "Non, les deux se cumulent. Le secret professionnel reste pleinement applicable ; le RGPD ajoute des obligations d'information, de sécurité, de durée et de respect des droits, sans jamais dispenser du secret.",
      },
      {
        q: 'Puis-je traiter des données judiciaires ?',
        a: "Oui, dans le cadre de votre mission, mais ces données (infractions, condamnations) relèvent d'un régime strict (art. 10 RGPD) : sécurité renforcée, accès limité et finalité précise.",
      },
      {
        q: 'Combien de temps conserver les dossiers ?',
        a: "Le temps de la mission puis une durée d'archivage définie tenant compte des obligations légales et de la prescription, avec une sécurité adaptée. Les dossiers ne doivent pas être conservés indéfiniment sans motif.",
      },
    ],
  },
  {
    slug: 'rgpd-veterinaire',
    title: 'RGPD vétérinaire : clients & rappels vaccins (2026)',
    description:
      'Cabinet ou clinique vétérinaire : RGPD du fichier des propriétaires, des rappels de vaccins par SMS, des ordonnances et du paiement. Vos obligations.',
    h1: 'RGPD pour les vétérinaires',
    lead: "Fichier des propriétaires, dossiers des animaux, rappels de vaccination par SMS, ordonnances : la clinique vétérinaire traite les données des maîtres, soumises au RGPD. Voici l'essentiel.",
    concerned:
      "Les données de l'animal ne sont pas des données personnelles, mais celles de son propriétaire le sont (coordonnées, historique, paiement). Dès que vous gérez un fichier clients et des rappels, le RGPD s'applique.",
    dataTitle: 'Les données que traite une clinique',
    dataPoints: [
      'Coordonnées des propriétaires et historique des visites.',
      "Dossiers des animaux rattachés au propriétaire.",
      'Rappels de vaccination / de soins par SMS ou email.',
      'Ordonnances et actes.',
      'Paiement et facturation.',
    ],
    risk:
      "Les points sensibles : distinguer le rappel de soin lié au suivi de l'animal (admis) de la prospection commerciale (consentement requis), sécuriser le fichier clients, et définir des durées de conservation raisonnables.",
    faq: [
      {
        q: "Les rappels de vaccins par SMS sont-ils autorisés ?",
        a: "Un rappel lié au suivi médical de l'animal relève du service. Une offre commerciale (alimentation, promotions) est de la prospection et suppose le consentement du propriétaire.",
      },
      {
        q: "Les données de l'animal sont-elles concernées par le RGPD ?",
        a: "Les données de l'animal en elles-mêmes ne sont pas des données personnelles, mais elles sont rattachées au propriétaire, dont les coordonnées et l'historique le sont. C'est ce fichier qu'il faut protéger.",
      },
      {
        q: 'Combien de temps conserver le fichier clients ?',
        a: "Le temps de la relation de soin, puis une durée raisonnable ; les données de facturation suivent les durées comptables. Supprimez les fichiers inactifs.",
      },
    ],
  },
  {
    slug: 'rgpd-impression-3d',
    title: 'RGPD impression 3D : fichiers clients & e-commerce (2026)',
    description:
      'Service d’impression 3D : RGPD des fichiers 3D envoyés par les clients, des commandes en ligne, de la confidentialité et des durées. Vos obligations.',
    h1: 'RGPD pour les services d’impression 3D',
    lead: "Commandes en ligne, fichiers 3D envoyés par les clients (parfois confidentiels ou protégés), coordonnées et paiement : un service d'impression 3D a un profil mi-e-commerce, mi-prestation. Voici l'essentiel.",
    concerned:
      "Vous collectez les coordonnées de vos clients et recevez leurs fichiers, qui peuvent contenir des données personnelles ou de la propriété intellectuelle. Si vous vendez en ligne, s'ajoutent les obligations propres à l'e-commerce.",
    dataTitle: 'Les données que traite un service 3D',
    dataPoints: [
      'Coordonnées clients et commandes.',
      'Fichiers 3D envoyés (parfois confidentiels ou protégés).',
      'Comptes clients et historique.',
      'Paiement (Stripe, PayPal…) et facturation.',
      'Éventuels cookies / tracking si boutique en ligne.',
    ],
    risk:
      "Les points sensibles : la confidentialité des fichiers clients (accès limité, suppression après la commande), les obligations e-commerce si vous vendez en ligne (CGV, cookies, information), et les transferts hors UE via vos prestataires de paiement.",
    faq: [
      {
        q: 'Que faire des fichiers 3D envoyés par les clients ?',
        a: "Les traiter de façon confidentielle, en limiter l'accès, et les supprimer une fois la commande honorée (sauf accord contraire). Ils peuvent contenir des données personnelles ou de la propriété intellectuelle.",
      },
      {
        q: "Ai-je les mêmes obligations qu'un e-commerce ?",
        a: "Si vous vendez en ligne, oui : mentions légales, politique de confidentialité, CGV, bandeau cookies conforme et registre. Voir notre guide dédié à l'e-commerce.",
      },
      {
        q: 'Combien de temps conserver les fichiers et commandes ?',
        a: "Les fichiers : le temps d'exécuter la commande, puis suppression. Les commandes/factures : selon les durées comptables. Informez vos clients de ces durées.",
      },
    ],
  },
]

export const METIER_LINKS = METIERS.map((m) => ({
  path: `/blog/${m.slug}`,
  title: m.h1,
  description: m.description,
}))

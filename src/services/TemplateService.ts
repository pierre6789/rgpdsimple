import fs from "fs";
import path from "path";
import { CustomerInput } from "../models/CustomerInput";
import { Order } from "../models/Order";

const BUSINESS_TYPE_LABELS: Record<CustomerInput["businessType"], string> = {
  restaurant: "Restauration",
  coiffeur: "Coiffure",
  garage: "Garage / Automobile",
  commerce: "Commerce de détail",
  artisan_btp: "Artisanat du BTP",
  consultant: "Conseil / Consultant",
  ecommerce: "E-commerce",
  impression_3d: "Impression 3D",
  professionnel_sante: "Professionnel de santé",
  comptable_expert: "Comptabilité / Expertise comptable",
  agence_immobiliere: "Agence immobilière",
  photographe: "Photographie",
  coach_therapeute: "Coaching / Thérapie",
  auto_ecole: "Auto-école",
  veterinaire: "Médecine vétérinaire",
  avocat: "Avocat / Conseil juridique",
  autre: "Prestation de services",
};

export interface GeneratedDocument {
  name: string;
  html: string;
}

type TemplateKey =
  | "guide_completion"
  | "politique_confidentialite"
  | "mentions_legales"
  | "cgv"
  | "registre_traitements"
  | "bandeau_cookies";

export class TemplateService {
  private loadTemplate(fileName: string): string {
    // Plusieurs bases possibles selon l'environnement (local vs Vercel serverless,
    // où les templates sont inclus via "includeFiles" dans vercel.json).
    const candidates = [
      path.join(process.cwd(), "src", "templates", "documents", fileName),
      path.join(__dirname, "..", "templates", "documents", fileName),
      path.join(__dirname, "..", "..", "src", "templates", "documents", fileName),
    ];
    for (const filePath of candidates) {
      try {
        return fs.readFileSync(filePath, "utf-8");
      } catch {
        // on essaie le chemin suivant
      }
    }
    throw new Error(`Template introuvable: ${fileName}`);
  }

  /** Traite les blocs conditionnels {{#if_secteur}}...{{/if_secteur}} : ne garde que le bloc du secteur de la commande */
  private processConditionals(template: string, businessType: string): string {
    const sector = businessType === "autre" ? "autre" : businessType;
    return template.replace(/\{\{#if_(\w+)\}\}([\s\S]*?)\{\{\/if_\1\}\}/g, (_, blockSector, content) =>
      blockSector === sector ? content : ""
    );
  }

  private render(template: string, order: Order): string {
    const website = order.customer.website || "N/A";
    const collectsEmailsText = order.customer.collectsEmails ? "oui" : "non";
    const hasCookiesText = order.customer.hasCookies ? "oui" : "non";
    const c = order.customer;

    // Valeurs par défaut pour les mentions légales 2026 (à compléter par le client ou via formulaire étendu)
    const defaults = {
      directeurPublication: c.companyName,
      hebergeurNom: "[Nom de l'hébergeur – À compléter]",
      hebergeurAdresse: "[Adresse du siège social de l'hébergeur – À compléter]",
      dpoMention: "Un délégué à la protection des données (DPO) peut être contacté à l'adresse indiquée ci-dessus, si applicable. À défaut, les demandes relatives aux données personnelles sont à adresser à l'éditeur.",
      mediateurNom: "[Nom du médiateur de la consommation – À compléter]",
      mediateurCoordonnees: "[Coordonnées du médiateur – À compléter]",
      mediateurUrl: "[Lien vers la fiche du médiateur – À compléter]",
      spocContact: c.email,
      reenMention: "À titre volontaire — la loi REEN n'impose pas d'obligation directe aux TPE/micro-entreprises —, nous appliquons des principes d'éco-conception (pages allégées, ressources optimisées, limitation des scripts non essentiels) et privilégions un hébergement responsable lorsque c'est possible. [Facultatif : adaptez ou supprimez cette mention.]",
      rgaaStatut: "Non applicable en l'état : en tant que micro-entreprise (moins de 10 salariés et moins de 2 M€ de chiffre d'affaires/bilan), vous êtes exempté des obligations d'accessibilité numérique de l'European Accessibility Act. [Si vous dépassez durablement ces seuils, une mise en conformité (norme EN 301 549 / RGAA) devient obligatoire.]",
      // Secteur restaurant
      licenceDebitBoissons: "[Catégorie et numéro de licence – À compléter]",
      lienAllergenes: "[lien ou « sur demande en établissement » – À compléter]",
      // Secteur coiffeur
      numeroRM: "[Numéro Répertoire des Métiers – À compléter]",
      lieuObtentionTitre: "[Lieu d'obtention du titre – À compléter]",
      // Secteur garage
      agrementPrefectoral: "[Si applicable – À compléter]",
      // Secteur commerce
      numeroTVA: "[Numéro TVA intracommunautaire – À compléter]",
      // Secteur artisan BTP
      assuranceDecennaleNom: "[Nom de l'assureur – À compléter]",
      assuranceDecennaleCoordonnees: "[Adresse / contact de l'assureur – À compléter]",
      assuranceDecennaleZone: "[Zone géographique de couverture – À compléter]",
      // Secteur consultant
      numeroSiret: "[SIRET / numéro URSSAF – À compléter]",
      telephoneContact: "[Téléphone – À compléter]",
      rcProMention: "[Référence et coordonnées de l'assurance RC Pro – À compléter]",
      titreEtOrdreMention: "[Si profession réglementée : titre et ordre professionnel – À compléter ou « Non applicable »]",
      // Secteur e-commerce
      iduRep: "[IDU REP emballages, DEEE, etc. – À compléter selon flux]",
      // CGV / CGPS – socle
      ecoParticipationMention: "[Si applicable : « Une éco-participation peut s'ajouter au prix pour certains produits (DEEE, mobilier, etc.) conformément à la réglementation. » Sinon supprimer ou laisser vide.]",
      moyensPaiement: "[À compléter : espèces, chèque, CB, virement, etc.]",
      echeancesPaiement: "[À compléter : paiement à la commande, à réception, à 30 jours fin de mois pour les pros, etc.]",
      tauxPenaliteRetard: "[Taux de pénalité de retard – ex. « taux d'intérêt légal » ou « 3 fois le taux d'intérêt légal » pour les B2B]",
      // Registre des traitements – en-tête et fiches
      dateMiseAJour: new Date().toISOString().slice(0, 10),
      contactDirigeant: "[Nom du dirigeant – À compléter]",
      dpoCoordonnees: `Non désigné ; pour toute demande relative aux données personnelles, contacter : ${c.email}`,
      destinatairesClients: "[À compléter : liste des sous-traitants ayant accès aux données clients (hébergeur, CRM, emailing).]",
      transfertsHorsUERegistre: "[À compléter : « Aucun transfert hors Union européenne », OU pays concernés et garanties. Pour des outils américains (hébergeur, paiement, analytics), préciser : Data Privacy Framework (décision d'adéquation UE–USA du 10 juillet 2023, pour les prestataires certifiés) et/ou Clauses Contractuelles Types (art. 46 RGPD).]",
      sousTraitantsCompta: "[Préciser : logiciel comptable, expert-comptable, hébergeur.]",
      // Politique de confidentialité – socle
      baseLegaleSecteur: "",
      dureeVideosurveillance: "1 mois maximum (souvent quelques jours ; recommandation CNIL), sauf conservation prolongée en cas de litige ou de réquisition des autorités.",
      dureesSecteur: "",
      sousTraitantsMention: "Liste des sous-traitants ayant accès à des données (hébergeur, outil de paiement, emailing, etc.) : [À compléter – nom, finalité, pays]. Ils sont soumis à des obligations contractuelles conformes au RGPD (art. 28).",
      transfertsHorsUEMention: "Si vous n'utilisez que des prestataires situés dans l'Union européenne : « Aucun transfert de données en dehors de l'Union européenne. » Si vous utilisez des outils américains (ex. hébergeur, paiement, mesure d'audience), les transferts sont encadrés par le Data Privacy Framework (décision d'adéquation UE–USA du 10 juillet 2023, pour les prestataires certifiés) et/ou par des Clauses Contractuelles Types (art. 46 RGPD). [À adapter selon vos outils ; le Data Privacy Framework fait l'objet d'un recours en cours devant la CJUE — prévoir les CCT en garantie de repli.]",
      securiteMention:
        "Nous mettons en œuvre des mesures techniques et organisationnelles adaptées pour protéger vos données (accès restreint, mots de passe robustes, chiffrement lorsque pertinent, sauvegardes). L’authentification à deux facteurs (MFA) n’est pas utilisée sur les accès courants. [Précisez vos mesures complémentaires si besoin.]",
      aiActMention: "Nous n’utilisons pas d’outil d’intelligence artificielle (chatbot conversationnel, décision automatisée ou profilage) pour traiter vos données. Si vous utilisez un chatbot IA, publiez des contenus générés par IA ou des contenus manipulés (« deepfakes »), vous devez en informer clairement les utilisateurs, conformément à l’article 50 du Règlement (UE) 2024/1689 (AI Act), applicable depuis le 2 août 2026. [À adapter selon vos usages : sans outil d’IA, aucune obligation ni mention n’est requise.]",
    };

    let out = this.processConditionals(template, c.businessType);
    out = out
      .replace(/{{nomEntreprise}}/g, c.companyName)
      .replace(/{{adresseComplete}}/g, c.address)
      .replace(/{{emailContact}}/g, c.email)
      .replace(/{{siteWeb}}/g, website)
      .replace(/{{typeActivite}}/g, BUSINESS_TYPE_LABELS[c.businessType] ?? c.businessType)
      .replace(/{{collecteEmails}}/g, collectsEmailsText)
      .replace(/{{siteAvecCookies}}/g, hasCookiesText)
      .replace(/{{directeurPublication}}/g, defaults.directeurPublication)
      .replace(/{{hebergeurNom}}/g, defaults.hebergeurNom)
      .replace(/{{hebergeurAdresse}}/g, defaults.hebergeurAdresse)
      .replace(/{{dpoMention}}/g, defaults.dpoMention)
      .replace(/{{mediateurNom}}/g, defaults.mediateurNom)
      .replace(/{{mediateurCoordonnees}}/g, defaults.mediateurCoordonnees)
      .replace(/{{mediateurUrl}}/g, defaults.mediateurUrl)
      .replace(/{{spocContact}}/g, defaults.spocContact)
      .replace(/{{reenMention}}/g, defaults.reenMention)
      .replace(/{{rgaaStatut}}/g, defaults.rgaaStatut)
      .replace(/{{licenceDebitBoissons}}/g, defaults.licenceDebitBoissons)
      .replace(/{{lienAllergenes}}/g, defaults.lienAllergenes)
      .replace(/{{numeroRM}}/g, defaults.numeroRM)
      .replace(/{{lieuObtentionTitre}}/g, defaults.lieuObtentionTitre)
      .replace(/{{agrementPrefectoral}}/g, defaults.agrementPrefectoral)
      .replace(/{{numeroTVA}}/g, defaults.numeroTVA)
      .replace(/{{assuranceDecennaleNom}}/g, defaults.assuranceDecennaleNom)
      .replace(/{{assuranceDecennaleCoordonnees}}/g, defaults.assuranceDecennaleCoordonnees)
      .replace(/{{assuranceDecennaleZone}}/g, defaults.assuranceDecennaleZone)
      .replace(/{{numeroSiret}}/g, defaults.numeroSiret)
      .replace(/{{telephoneContact}}/g, defaults.telephoneContact)
      .replace(/{{rcProMention}}/g, defaults.rcProMention)
      .replace(/{{titreEtOrdreMention}}/g, defaults.titreEtOrdreMention)
      .replace(/{{iduRep}}/g, defaults.iduRep)
      .replace(/{{baseLegaleSecteur}}/g, defaults.baseLegaleSecteur)
      .replace(/{{dureeVideosurveillance}}/g, defaults.dureeVideosurveillance)
      .replace(/{{dureesSecteur}}/g, defaults.dureesSecteur)
      .replace(/{{sousTraitantsMention}}/g, defaults.sousTraitantsMention)
      .replace(/{{transfertsHorsUEMention}}/g, defaults.transfertsHorsUEMention)
      .replace(/{{securiteMention}}/g, defaults.securiteMention)
      .replace(/{{aiActMention}}/g, defaults.aiActMention)
      .replace(/{{ecoParticipationMention}}/g, defaults.ecoParticipationMention)
      .replace(/{{moyensPaiement}}/g, defaults.moyensPaiement)
      .replace(/{{echeancesPaiement}}/g, defaults.echeancesPaiement)
      .replace(/{{tauxPenaliteRetard}}/g, defaults.tauxPenaliteRetard)
      .replace(/{{dateMiseAJour}}/g, defaults.dateMiseAJour)
      .replace(/{{contactDirigeant}}/g, defaults.contactDirigeant)
      .replace(/{{dpoCoordonnees}}/g, defaults.dpoCoordonnees)
      .replace(/{{destinatairesClients}}/g, defaults.destinatairesClients)
      .replace(/{{transfertsHorsUERegistre}}/g, defaults.transfertsHorsUERegistre)
      .replace(/{{sousTraitantsCompta}}/g, defaults.sousTraitantsCompta);
    return out;
  }

  async generateAllDocuments(order: Order): Promise<GeneratedDocument[]> {
    const templates: { key: TemplateKey; file: string; label: string }[] = [
      {
        key: "guide_completion",
        file: "guide_completion.html",
        label: "Guide à compléter",
      },
      {
        key: "politique_confidentialite",
        file: "politique_confidentialite.html",
        label: "Politique de confidentialité RGPD",
      },
      {
        key: "mentions_legales",
        file: "mentions_legales.html",
        label: "Mentions légales",
      },
      {
        key: "cgv",
        file: "cgv.html",
        label: "Conditions générales de vente",
      },
      {
        key: "registre_traitements",
        file: "registre_traitements.html",
        label: "Registre des traitements de données",
      },
      {
        key: "bandeau_cookies",
        file: "bandeau_cookies.html",
        label: "Bandeau cookies (HTML)",
      },
    ];

    return templates.map((tpl) => {
      const raw = this.loadTemplate(tpl.file);
      const html = this.render(raw, order);
      return {
        name: tpl.label,
        html,
      };
    });
  }
}


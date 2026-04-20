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
    const filePath = path.join(process.cwd(), "src", "templates", "documents", fileName);
    return fs.readFileSync(filePath, "utf-8");
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
      reenMention: "Conformément à la loi relative à la réduction de l'empreinte environnementale du numérique (REEN), nous nous engageons à favoriser l'éco-conception du site et/ou à recourir à un hébergement dont l'engagement environnemental est connu. [Précisions à compléter selon votre situation.]",
      rgaaStatut: "[Totalement conforme / Partiellement conforme / Non conforme – À compléter]",
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
      transfertsHorsUERegistre: "[À compléter si transferts hors UE : pays et garanties (CCT, adéquation). Sinon : « Aucun transfert hors Union européenne. »]",
      sousTraitantsCompta: "[Préciser : logiciel comptable, expert-comptable, hébergeur.]",
      // Politique de confidentialité – socle
      baseLegaleSecteur: "",
      dureeVideosurveillance: "30 jours (sauf conservation prolongée en cas de litige ou réquisition).",
      dureesSecteur: "",
      sousTraitantsMention: "Liste des sous-traitants ayant accès à des données (hébergeur, outil de paiement, emailing, etc.) : [À compléter – nom, finalité, pays]. Ils sont soumis à des obligations contractuelles conformes au RGPD (art. 28).",
      transfertsHorsUEMention: "[À compléter si transferts hors UE : pays concernés et garanties (Clauses Contractuelles Types / Décision d’adéquation / autres garanties appropriées). Si aucun transfert hors UE : « Aucun transfert de données en dehors de l’Union européenne. »]",
      securiteMention:
        "Nous mettons en œuvre des mesures techniques et organisationnelles adaptées pour protéger vos données (accès restreint, mots de passe robustes, chiffrement lorsque pertinent, sauvegardes). L’authentification à deux facteurs (MFA) n’est pas utilisée sur les accès courants. [Précisez vos mesures complémentaires si besoin.]",
      aiActMention: "Nous n’utilisons pas d’outils d’intelligence artificielle (chatbots IA, algorithme de prise de décision automatisée ou de profilage) pour traiter vos données. Si tel devait être le cas à l’avenir, nous vous en informerions et assurerions la transparence requise par le Règlement (UE) sur l’IA (AI Act). [À adapter si vous utilisez déjà des outils IA.]",
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


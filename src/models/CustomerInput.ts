export type BusinessType =
  | "restaurant"
  | "coiffeur"
  | "garage"
  | "commerce"
  | "artisan_btp"
  | "consultant"
  | "ecommerce"
  | "professionnel_sante"
  | "comptable_expert"
  | "agence_immobiliere"
  | "photographe"
  | "coach_therapeute"
  | "auto_ecole"
  | "veterinaire"
  | "avocat"
  | "autre";

export interface CustomerInput {
  companyName: string;
  businessType: BusinessType;
  address: string;
  email: string;
  website: string;
  collectsEmails: boolean;
  hasCookies: boolean;
}


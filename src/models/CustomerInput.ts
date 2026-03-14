export type BusinessType =
  | "restaurant"
  | "coiffeur"
  | "garage"
  | "commerce"
  | "artisan_btp"
  | "consultant"
  | "ecommerce"
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


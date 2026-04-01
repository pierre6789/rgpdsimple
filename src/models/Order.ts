import { CustomerInput } from "./CustomerInput";

export type OrderStatus = "pending_payment" | "paid_processing" | "completed" | "failed";

/** Preuve d’acceptation des CGV avant redirection vers Stripe (LCEN / rétractation). */
export interface CgvConsentRecord {
  accepted: true;
  acceptedAt: string;
  clientIp: string;
}

export interface Order {
  id: string;
  customer: CustomerInput;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  sentAt?: string;
  stripeSessionId?: string;
  /** Saisie au moment du passage commande (case cochée + IP). */
  cgvConsent?: CgvConsentRecord;
  /** Horodatage de la confirmation du paiement côté serveur (webhook ou page succès). */
  paymentConfirmedAt?: string;
}


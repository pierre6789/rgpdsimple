import Stripe from "stripe";
import dotenv from "dotenv";
import { APP_CONFIG } from "./appConfig";

dotenv.config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.warn("STRIPE_SECRET_KEY manquante dans le fichier .env");
}

export const stripe: Stripe | null = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

export const STRIPE_PRODUCT_CONFIG = {
  name: "Pack documents RGPD TPE / artisans",
  amount: APP_CONFIG.basePriceEuros * 100,
  currency: APP_CONFIG.currency,
};


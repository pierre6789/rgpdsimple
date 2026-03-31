import { stripe, STRIPE_PRODUCT_CONFIG } from "../config/stripe";
import { Order } from "../models/Order";

export class StripeService {
  async createCheckoutSession(order: Order) {
    if (!stripe) {
      throw new Error(
        "Stripe n'est pas configuré. Ajoutez STRIPE_SECRET_KEY (clé de test) dans votre fichier .env."
      );
    }

    // Success reste côté backend pour traiter la commande (fallback si webhook Stripe absent)
    const successUrl = `${process.env.APP_URL || "http://localhost:3000"}/success?orderId=${order.id}&session_id={CHECKOUT_SESSION_ID}`;
    // Cancel doit renvoyer vers le site frontend, pas vers l'API backend
    const cancelUrl = `${process.env.APP_URL_FRONTEND || "http://localhost:5173"}/`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      client_reference_id: order.id,
      customer_email: order.customer.email,
      line_items: [
        {
          price_data: {
            currency: STRIPE_PRODUCT_CONFIG.currency,
            unit_amount: STRIPE_PRODUCT_CONFIG.amount,
            product_data: {
              name: STRIPE_PRODUCT_CONFIG.name,
            },
          },
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        order_id: order.id,
        customer_email: order.customer.email,
        customer_companyName: order.customer.companyName,
        customer_businessType: order.customer.businessType,
        customer_address: order.customer.address,
        customer_website: order.customer.website || "",
        customer_collectsEmails: order.customer.collectsEmails ? "1" : "0",
        customer_hasCookies: order.customer.hasCookies ? "1" : "0",
      },
    });

    return session;
  }

  async retrieveSession(sessionId: string) {
    if (!stripe) {
      throw new Error(
        "Stripe n'est pas configuré. Ajoutez STRIPE_SECRET_KEY (clé de test) dans votre fichier .env."
      );
    }
    return stripe.checkout.sessions.retrieve(sessionId);
  }
}


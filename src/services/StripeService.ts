import { stripe, STRIPE_PRODUCT_CONFIG } from "../config/stripe";
import { Order } from "../models/Order";

export class StripeService {
  async createCheckoutSession(order: Order) {
    if (!stripe) {
      throw new Error(
        "Stripe n'est pas configuré. Ajoutez STRIPE_SECRET_KEY (clé de test) dans votre fichier .env."
      );
    }

    const successUrl = `${process.env.APP_URL || "http://localhost:3000"}/success?orderId=${order.id}&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${process.env.APP_URL || "http://localhost:3000"}/`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
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


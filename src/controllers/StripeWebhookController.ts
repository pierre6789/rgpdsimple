import { Request, Response } from "express";
import { stripe } from "../config/stripe";
import { OrderService } from "../services/OrderService";

const orderService = new OrderService();

export class StripeWebhookController {
  async handleWebhook(req: Request, res: Response): Promise<void> {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret || !stripe) {
      console.error("STRIPE_WEBHOOK_SECRET ou Stripe manquant");
      res.status(500).send("Webhook non configuré");
      return;
    }

    const signature = req.headers["stripe-signature"];
    if (!signature || typeof signature !== "string") {
      res.status(400).send("Signature manquante");
      return;
    }

    // req.body est le Buffer brut (middleware express.raw)
    const rawBody = req.body as Buffer;
    if (!rawBody || !Buffer.isBuffer(rawBody)) {
      res.status(400).send("Body invalide");
      return;
    }

    let event: import("stripe").Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Signature invalide";
      console.error("Erreur vérification webhook Stripe:", message);
      res.status(400).send(`Webhook Error: ${message}`);
      return;
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as import("stripe").Stripe.Checkout.Session;
      const orderId = (session.client_reference_id || session.metadata?.order_id) as string | undefined;
      if (!orderId) {
        console.error("[Webhook] checkout.session.completed sans order_id / client_reference_id");
        res.status(200).send();
        return;
      }
      console.log("[Webhook] Traitement commande:", orderId, "email:", session.metadata?.customer_email);
      try {
        await orderService.processPaidOrder(orderId, session);
        console.log("[Webhook] Commande traitée et email envoyé:", orderId);
      } catch (err) {
        console.error("[Webhook] Erreur processPaidOrder:", err);
        res.status(500).send("Erreur traitement commande");
        return;
      }
    }

    res.status(200).send();
  }
}

import { Request, Response } from "express";
import { StripeService } from "../services/StripeService";
import { OrderService } from "../services/OrderService";
import { EMAIL_CONFIG } from "../config/email";

const stripeService = new StripeService();
const orderService = new OrderService();

export class SuccessController {
  async handleSuccess(req: Request, res: Response): Promise<void> {
    const sessionId = req.query.session_id as string | undefined;
    const orderId = req.query.orderId as string | undefined;

    if (!sessionId || !orderId) {
      res
        .status(400)
        .send("Paramètres de confirmation manquants après le paiement. Merci de contacter le support si besoin.");
      return;
    }

    try {
      const session = await stripeService.retrieveSession(sessionId);

      if (session.payment_status !== "paid") {
        res.status(400).send("Le paiement n'est pas confirmé.");
        return;
      }

      // Génération PDF + envoi email ici (fallback si le webhook Stripe ne se déclenche pas)
      try {
        await orderService.processPaidOrder(orderId, session as import("stripe").Stripe.Checkout.Session);
      } catch (err) {
        console.error("Erreur processPaidOrder dans /success:", err);
        // On redirige quand même pour ne pas bloquer l'utilisateur
      }

      const order = await orderService.getOrderById(orderId);
      const frontendUrl = process.env.APP_URL_FRONTEND || "http://localhost:5173";
      const email = encodeURIComponent(order?.customer.email ?? (session as any).customer_details?.email ?? "");
      const supportEmail = encodeURIComponent(process.env.SUPPORT_EMAIL || EMAIL_CONFIG.from);

      res.redirect(
        302,
        `${frontendUrl}/success?orderId=${encodeURIComponent(orderId)}&email=${email}&supportEmail=${supportEmail}`
      );
    } catch (error) {
      console.error("Erreur lors du traitement du succès", error);
      res
        .status(500)
        .send(
          "Un problème est survenu après le paiement. Vos documents seront envoyés manuellement si nécessaire."
        );
    }
  }
}


import { Request, Response } from "express";
import { OrderService } from "../services/OrderService";
import { StripeService } from "../services/StripeService";
import { CustomerInput } from "../models/CustomerInput";

const orderService = new OrderService();
const stripeService = new StripeService();

export class CheckoutController {
  async createCheckoutSession(req: Request, res: Response): Promise<void> {
    try {
      const input: CustomerInput = {
        companyName: req.body.companyName,
        businessType: req.body.businessType,
        address: req.body.address,
        email: req.body.email,
        website: req.body.website || "",
        collectsEmails: req.body.collectsEmails === true || req.body.collectsEmails === "yes",
        hasCookies: req.body.hasCookies === true || req.body.hasCookies === "yes",
      };

      const order = await orderService.createPendingOrder(input);
      const session = await stripeService.createCheckoutSession(order);

      res.status(200).json({ url: session.url });
    } catch (error) {
      console.error("Erreur création session Stripe", error);
      res.status(500).json({
        message: "Impossible de créer la session de paiement. Merci de réessayer.",
      });
    }
  }
}


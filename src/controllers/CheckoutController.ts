import { Request, Response } from "express";
import { OrderService } from "../services/OrderService";
import { StripeService } from "../services/StripeService";
import { CustomerInput } from "../models/CustomerInput";

const orderService = new OrderService();
const stripeService = new StripeService();

function clientIpFromRequest(req: Request): string {
  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string" && xff.length > 0) {
    return xff.split(",")[0].trim();
  }
  if (Array.isArray(xff) && xff[0]) {
    return xff[0].split(",")[0].trim();
  }
  return req.socket.remoteAddress || "";
}

export class CheckoutController {
  async createCheckoutSession(req: Request, res: Response): Promise<void> {
    try {
      const cgvAccepted = req.body.cgvAccepted === true || req.body.cgvAccepted === "true";
      if (!cgvAccepted) {
        res.status(400).json({ message: "Vous devez accepter les CGV pour continuer." });
        return;
      }

      const input: CustomerInput = {
        companyName: req.body.companyName,
        businessType: req.body.businessType,
        address: req.body.address,
        email: req.body.email,
        website: req.body.website || "",
        collectsEmails: req.body.collectsEmails === true || req.body.collectsEmails === "yes",
        hasCookies: req.body.hasCookies === true || req.body.hasCookies === "yes",
      };

      const acceptedAt = new Date().toISOString();
      const clientIp = clientIpFromRequest(req);

      const order = await orderService.createPendingOrder(input, { acceptedAt, clientIp });
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


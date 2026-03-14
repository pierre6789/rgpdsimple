import { Router } from "express";
import { StripeWebhookController } from "../controllers/StripeWebhookController";

const router = Router();
const controller = new StripeWebhookController();

// POST /api/webhook — Stripe envoie les événements ici (body brut pour la signature)
router.post("/", (req, res) => controller.handleWebhook(req, res));

export default router;

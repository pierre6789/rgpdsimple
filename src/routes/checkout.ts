import { Router } from "express";
import { CheckoutController } from "../controllers/CheckoutController";

const router = Router();
const controller = new CheckoutController();

router.post("/checkout", (req, res) => controller.createCheckoutSession(req, res));

export default router;


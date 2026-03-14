import { Router } from "express";
import { LandingController } from "../controllers/LandingController";

const router = Router();
const controller = new LandingController();

router.get("/", (req, res) => controller.showLanding(req, res));

export default router;


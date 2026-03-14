import { Router } from "express";
import { SuccessController } from "../controllers/SuccessController";

const router = Router();
const controller = new SuccessController();

router.get("/success", (req, res) => controller.handleSuccess(req, res));

export default router;


import { Request, Response } from "express";
import { APP_CONFIG } from "../config/appConfig";

export class LandingController {
  showLanding(req: Request, res: Response): void {
    res.render("landing", {
      title: "Documents RGPD pour TPE & artisans",
      price: APP_CONFIG.basePriceEuros,
    });
  }
}


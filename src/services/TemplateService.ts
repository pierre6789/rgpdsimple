import fs from "fs";
import path from "path";
import { Order } from "../models/Order";

export interface GeneratedDocument {
  name: string;
  html: string;
}

type TemplateKey =
  | "politique_confidentialite"
  | "mentions_legales"
  | "cgv"
  | "registre_traitements"
  | "bandeau_cookies";

export class TemplateService {
  private loadTemplate(fileName: string): string {
    const filePath = path.join(process.cwd(), "src", "templates", "documents", fileName);
    return fs.readFileSync(filePath, "utf-8");
  }

  private render(template: string, order: Order): string {
    const website = order.customer.website || "N/A";
    const collectsEmailsText = order.customer.collectsEmails ? "oui" : "non";
    const hasCookiesText = order.customer.hasCookies ? "oui" : "non";

    return template
      .replace(/{{nomEntreprise}}/g, order.customer.companyName)
      .replace(/{{adresseComplete}}/g, order.customer.address)
      .replace(/{{emailContact}}/g, order.customer.email)
      .replace(/{{siteWeb}}/g, website)
      .replace(/{{typeActivite}}/g, order.customer.businessType)
      .replace(/{{collecteEmails}}/g, collectsEmailsText)
      .replace(/{{siteAvecCookies}}/g, hasCookiesText);
  }

  private getCgvTemplateFile(businessType: string): string {
    switch (businessType) {
      case "restaurant":
        return "cgv_restaurant.html";
      case "coiffeur":
        return "cgv_coiffeur.html";
      case "garage":
        return "cgv_garage.html";
      case "commerce":
        return "cgv_commerce.html";
      case "artisan_btp":
        return "cgv_artisan_btp.html";
      case "consultant":
        return "cgv_consultant.html";
      case "ecommerce":
        return "cgv_ecommerce.html";
      default:
        return "cgv_generiques.html";
    }
  }

  async generateAllDocuments(order: Order): Promise<GeneratedDocument[]> {
    const templates: { key: TemplateKey; file: string; label: string }[] = [
      {
        key: "politique_confidentialite",
        file: "politique_confidentialite.html",
        label: "Politique de confidentialité RGPD",
      },
      {
        key: "mentions_legales",
        file: "mentions_legales.html",
        label: "Mentions légales",
      },
      {
        key: "cgv",
        file: this.getCgvTemplateFile(order.customer.businessType),
        label: "Conditions générales de vente",
      },
      {
        key: "registre_traitements",
        file: "registre_traitements.html",
        label: "Registre des traitements de données",
      },
      {
        key: "bandeau_cookies",
        file: "bandeau_cookies.html",
        label: "Bandeau cookies (HTML)",
      },
    ];

    return templates.map((tpl) => {
      const raw = this.loadTemplate(tpl.file);
      const html = this.render(raw, order);
      return {
        name: tpl.label,
        html,
      };
    });
  }
}


import nodemailer from "nodemailer";
import { EMAIL_CONFIG } from "../config/email";
import { PdfDocumentBuffer } from "./PdfService";

const MAILTRAP_SEND_URL = "https://send.api.mailtrap.io/api/send";

export class EmailService {
  private transporter = nodemailer.createTransport({
    host: EMAIL_CONFIG.host,
    port: EMAIL_CONFIG.port,
    secure: false,
    auth: {
      user: EMAIL_CONFIG.user,
      pass: EMAIL_CONFIG.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });

  async sendDocuments(recipient: string, pdfs: PdfDocumentBuffer[]): Promise<void> {
    const useApi = Boolean(EMAIL_CONFIG.mailtrapApiToken);
    console.log(useApi ? "[Email] Envoi via API Mailtrap (HTTPS)" : "[Email] Envoi via SMTP (MAILTRAP_API_TOKEN non défini)");
    if (useApi) {
      await this.sendViaMailtrapApi(recipient, pdfs);
      return;
    }
    await this.sendViaSmtp(recipient, pdfs);
  }

  /** Envoi via l'API Mailtrap (HTTPS) — évite les blocages SMTP sur Render */
  private async sendViaMailtrapApi(recipient: string, pdfs: PdfDocumentBuffer[]): Promise<void> {
    const attachments = pdfs.map((pdf) => ({
      content: pdf.buffer.toString("base64"),
      filename: pdf.filename,
      type: "application/pdf",
    }));

    const body = {
      from: { email: EMAIL_CONFIG.from, name: "RGPD Simple" },
      to: [{ email: recipient }],
      subject: "Vos documents RGPD personnalisés",
      text:
        "Bonjour,\n\nVous trouverez en pièces jointes vos documents RGPD personnalisés : un guide à compléter (à lire en premier), la politique de confidentialité, les mentions légales, les CGV, le registre des traitements et le bandeau cookies.\n\nConservez-les précieusement, complétez les zones indiquées dans le guide, puis intégrez les documents à votre site web.\n\nCordialement,\nL'équipe RGPD.",
      attachments,
    };

    const res = await fetch(MAILTRAP_SEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${EMAIL_CONFIG.mailtrapApiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const responseText = await res.text();
    if (!res.ok) {
      console.error("[Email] Mailtrap API error:", res.status, responseText);
      throw new Error(`Mailtrap API ${res.status}: ${responseText}`);
    }
    // Log pour debug livraison (message_ids = accepté par Mailtrap)
    try {
      const data = responseText ? JSON.parse(responseText) : {};
      console.log("[Email] Mailtrap response:", JSON.stringify(data));
    } catch {
      console.log("[Email] Mailtrap response (raw):", responseText);
    }
  }

  private async sendViaSmtp(recipient: string, pdfs: PdfDocumentBuffer[]): Promise<void> {
    const attachments = pdfs.map((pdf) => ({
      filename: pdf.filename,
      content: pdf.buffer,
    }));

    await this.transporter.sendMail({
      from: EMAIL_CONFIG.from,
      to: recipient,
      subject: "Vos documents RGPD personnalisés",
      text:
        "Bonjour,\n\nVous trouverez en pièces jointes vos documents RGPD personnalisés : un guide à compléter (à lire en premier), la politique de confidentialité, les mentions légales, les CGV, le registre des traitements et le bandeau cookies.\n\nConservez-les précieusement, complétez les zones indiquées dans le guide, puis intégrez les documents à votre site web.\n\nCordialement,\nL'équipe RGPD.",
      attachments,
    });
  }
}


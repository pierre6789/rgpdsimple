import nodemailer from "nodemailer";
import { EMAIL_CONFIG } from "../config/email";
import { PdfDocumentBuffer } from "./PdfService";

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
  });

  async sendDocuments(recipient: string, pdfs: PdfDocumentBuffer[]): Promise<void> {
    const attachments = pdfs.map((pdf) => ({
      filename: pdf.filename,
      content: pdf.buffer,
    }));

    await this.transporter.sendMail({
      from: EMAIL_CONFIG.from,
      to: recipient,
      subject: "Vos documents RGPD personnalisés",
      text:
        "Bonjour,\n\nVous trouverez en pièces jointes vos documents RGPD personnalisés (politique de confidentialité, mentions légales, CGV, registre des traitements, bandeau cookies).\n\nConservez-les précieusement et intégrez-les à votre site web.\n\nCordialement,\nL'équipe RGPD.",
      attachments,
    });
  }
}


import dotenv from "dotenv";

dotenv.config();

export const EMAIL_CONFIG = {
  host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
  port: Number(process.env.SMTP_PORT || 2525),
  user: process.env.SMTP_USER || "",
  pass: process.env.SMTP_PASS || "",
  // On retire d'éventuels guillemets ajoutés par erreur autour de la valeur
  // (ex. copié «"RGPD Simple <no-reply@rgpdsimple.fr>"» avec les guillemets) —
  // sinon l'adresse d'expéditeur est mal formée et l'email est rejeté.
  from: (process.env.EMAIL_FROM || "rgpd@exemple.local").trim().replace(/^"(.*)"$/, "$1"),
  /** Si défini, on utilise l'API Mailtrap (HTTPS) au lieu du SMTP — plus fiable depuis Render */
  mailtrapApiToken: process.env.MAILTRAP_API_TOKEN || "",
};


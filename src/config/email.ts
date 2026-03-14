import dotenv from "dotenv";

dotenv.config();

export const EMAIL_CONFIG = {
  host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
  port: Number(process.env.SMTP_PORT || 2525),
  user: process.env.SMTP_USER || "",
  pass: process.env.SMTP_PASS || "",
  from: process.env.EMAIL_FROM || "rgpd@exemple.local",
};


import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import checkoutRouter from "./routes/checkout";
import successRouter from "./routes/success";
import webhookRouter from "./routes/webhook";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Origines autorisées (CORS) : liste séparée par des virgules dans APP_URL_FRONTEND.
// Ex. "https://rgpdsimple.fr,https://www.rgpdsimple.fr". localhost autorisé par défaut en dev.
const allowedOrigins = (process.env.APP_URL_FRONTEND || "http://localhost:5173")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Pas d'origine (server-to-server, curl, redirections Stripe) : on laisse passer.
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(null, false);
    },
    credentials: true,
  })
);

// Webhook Stripe : body brut obligatoire pour la vérification de signature (avant express.json)
const webhookRaw = express.raw({ type: "application/json" });
app.use("/api/webhook", webhookRaw, webhookRouter);
app.use("/webhook/stripe", webhookRaw, webhookRouter);

app.use(express.json());

// API routes utilisées par le frontend React
app.use("/api", checkoutRouter);
app.use("/", successRouter);

// Diagnostic (sans exposer les secrets) : vérifier que la config est prête
app.get("/api/debug-env", (_req, res) => {
  res.json({
    hasStripeWebhookSecret: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
    hasStripeSecretKey: Boolean(process.env.STRIPE_SECRET_KEY),
    hasMailtrapApiToken: Boolean(process.env.MAILTRAP_API_TOKEN),
    hasSmtpHost: Boolean(process.env.SMTP_HOST),
    hasSmtpUser: Boolean(process.env.SMTP_USER),
    hasSmtpPass: Boolean(process.env.SMTP_PASS),
    hasEmailFrom: Boolean(process.env.EMAIL_FROM),
    hasSupabaseUrl: Boolean(process.env.SUPABASE_URL),
    hasSupabaseServiceKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    allowedOrigins,
  });
});

// En local uniquement : on démarre le serveur HTTP. Sur Vercel (serverless),
// c'est la fonction api/index.ts qui utilise l'app exportée ci-dessous.
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Serveur RGPD API démarré sur http://localhost:${PORT}`);
  });
}

export default app;

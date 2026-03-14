import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import checkoutRouter from "./routes/checkout";
import successRouter from "./routes/success";
import webhookRouter from "./routes/webhook";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.APP_URL_FRONTEND || "http://localhost:5173",
  })
);

// Webhook Stripe : body brut obligatoire pour la vérification de signature (avant express.json)
app.use("/api/webhook", express.raw({ type: "application/json" }), webhookRouter);

app.use(express.json());

// API routes utilisées par le frontend React
app.use("/api", checkoutRouter);
app.use("/", successRouter);

app.listen(PORT, () => {
  console.log(`Serveur RGPD API démarré sur http://localhost:${PORT}`);
});


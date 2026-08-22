// Point d'entrée serverless Vercel : toutes les requêtes (/api/checkout,
// /api/webhook, /success, ...) sont routées ici (voir vercel.json) et
// traitées par l'app Express exportée depuis src/server.ts.
import app from "../src/server";

export default app;

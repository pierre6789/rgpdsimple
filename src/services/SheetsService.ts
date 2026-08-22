import type Stripe from "stripe";
import { sheets as sheetsApi, auth as googleAuth } from "@googleapis/sheets";
import { OrderService } from "./OrderService";

const SHEET_TAB = "💰 Ventes";
const orderService = new OrderService();
const VA_COMMISSION_EUR = 15;

export interface AppendVenteParams {
  affiliateVia: string;
  amountCents: number;
  email: string;
  sessionId: string;
}

function formatDateFR(date: Date): string {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

function formatSemaine(date: Date): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `Sem. ${String(weekNo).padStart(2, "0")}`;
}

function formatAmountEuros(amountCents: number): string {
  const euros = amountCents / 100;
  return euros.toFixed(2).replace(".", ",");
}

function getSheetsClient() {
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
  const saJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

  if (!spreadsheetId) {
    console.error("[Sheets] GOOGLE_SHEETS_ID manquant dans les variables d'environnement");
    return null;
  }
  if (!saJson) {
    console.error("[Sheets] GOOGLE_SERVICE_ACCOUNT_JSON manquant dans les variables d'environnement");
    return null;
  }

  let credentials: Record<string, unknown>;
  try {
    credentials = JSON.parse(saJson) as Record<string, unknown>;
  } catch (parseErr) {
    console.error("[Sheets] GOOGLE_SERVICE_ACCOUNT_JSON invalide (JSON illisible):", parseErr);
    return null;
  }

  const authClient = new googleAuth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return { sheets: sheetsApi({ version: "v4", auth: authClient }), spreadsheetId };
}

/** Ajoute une ligne de vente dans l'onglet « 💰 Ventes » (lève une erreur si l'API échoue). */
export async function appendVente(params: AppendVenteParams): Promise<void> {
  const client = getSheetsClient();
  if (!client) {
    throw new Error(
      `Configuration Google Sheets incomplète — vente non exportée (session: ${params.sessionId})`
    );
  }

  const now = new Date();
  const row = [
    formatDateFR(now),
    params.affiliateVia || "direct",
    formatAmountEuros(params.amountCents),
    String(VA_COMMISSION_EUR),
    formatSemaine(now),
    "⏳ En attente",
    params.email || "",
    params.sessionId,
  ];

  await client.sheets.spreadsheets.values.append({
    spreadsheetId: client.spreadsheetId,
    range: `'${SHEET_TAB}'!A:H`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [row],
    },
  });

  console.log(
    "[Sheets] Vente enregistrée — VA:",
    params.affiliateVia,
    "session:",
    params.sessionId,
    "email:",
    params.email
  );
}

/**
 * Exporte la vente affiliée (webhook ou page /success), une seule fois par commande.
 */
export async function exportAffiliateSaleIfNeeded(
  orderId: string,
  session: Stripe.Checkout.Session
): Promise<void> {
  const order = await orderService.getOrderById(orderId);
  if (order?.sheetsExportedAt) {
    console.log("[Sheets] Export déjà effectué pour la commande:", orderId);
    return;
  }

  const affiliateVia = session.metadata?.affiliate_via || "direct";
  const customerEmail =
    session.customer_email || session.customer_details?.email || "";
  const amountCents = session.amount_total ?? 0;

  console.log("[Sheets] Tentative écriture...", {
    orderId,
    sessionId: session.id,
    affiliateVia,
    email: customerEmail,
    amountCents,
  });

  await appendVente({
    affiliateVia,
    amountCents,
    email: customerEmail,
    sessionId: session.id,
  });

  if (order) {
    order.sheetsExportedAt = new Date().toISOString();
    await orderService.updateOrder(order);
  }
}

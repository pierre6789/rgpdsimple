import { google } from "googleapis";

const SHEET_TAB = "💰 Ventes";
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

  if (!spreadsheetId || !saJson) {
    return null;
  }

  let credentials: Record<string, unknown>;
  try {
    credentials = JSON.parse(saJson) as Record<string, unknown>;
  } catch {
    console.error("[Sheets] GOOGLE_SERVICE_ACCOUNT_JSON invalide (JSON illisible)");
    return null;
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return { sheets: google.sheets({ version: "v4", auth }), spreadsheetId };
}

/** Ajoute une ligne de vente dans l'onglet « 💰 Ventes » */
export async function appendVente(params: AppendVenteParams): Promise<void> {
  const client = getSheetsClient();
  if (!client) {
    console.warn("[Sheets] Configuration manquante — vente non exportée (session:", params.sessionId, ")");
    return;
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

  try {
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
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[Sheets] Erreur appendVente (non bloquante):", msg, "session:", params.sessionId);
  }
}

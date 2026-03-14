import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import { GeneratedDocument } from "./TemplateService";

export interface PdfDocumentBuffer {
  filename: string;
  buffer: Buffer;
}

export class PdfService {
  async htmlDocumentsToPdfs(documents: GeneratedDocument[]): Promise<PdfDocumentBuffer[]> {
    const executablePath = await chromium.executablePath();

    const browser = await puppeteer.launch({
      args: [
        ...chromium.args,
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
      defaultViewport: { width: 1280, height: 720 },
      executablePath,
      headless: true,
    });

    try {
      const results: PdfDocumentBuffer[] = [];

      for (const doc of documents) {
        const page = await browser.newPage();
        await page.setContent(doc.html, { waitUntil: "networkidle0" });
        const pdfUint8Array = await page.pdf({
          format: "A4",
          printBackground: true,
        });

        const safeName = doc.name.toLowerCase().replace(/\s+/g, "_") + ".pdf";

        results.push({
          filename: safeName,
          buffer: Buffer.from(pdfUint8Array),
        });

        await page.close();
      }

      return results;
    } finally {
      await browser.close();
    }
  }
}


import puppeteer from "puppeteer";
import { GeneratedDocument } from "./TemplateService";

export interface PdfDocumentBuffer {
  filename: string;
  buffer: Buffer;
}

export class PdfService {
  async htmlDocumentsToPdfs(documents: GeneratedDocument[]): Promise<PdfDocumentBuffer[]> {
    const browser = await puppeteer.launch({
      headless: "new",
    });

    try {
      const results: PdfDocumentBuffer[] = [];

      for (const doc of documents) {
        const page = await browser.newPage();
        await page.setContent(doc.html, { waitUntil: "networkidle0" });
        const pdfBuffer = await page.pdf({
          format: "A4",
          printBackground: true,
        });

        const safeName = doc.name.toLowerCase().replace(/\s+/g, "_") + ".pdf";

        results.push({
          filename: safeName,
          buffer: pdfBuffer,
        });

        await page.close();
      }

      return results;
    } finally {
      await browser.close();
    }
  }
}


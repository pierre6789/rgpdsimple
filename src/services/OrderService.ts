import { randomUUID } from "crypto";
import type { Stripe } from "stripe";
import { CustomerInput } from "../models/CustomerInput";
import { Order } from "../models/Order";
import { StorageService } from "./StorageService";
import { TemplateService } from "./TemplateService";
import { PdfService } from "./PdfService";
import { EmailService } from "./EmailService";

const storage = new StorageService();
const templateService = new TemplateService();
const pdfService = new PdfService();
const emailService = new EmailService();

const BUSINESS_TYPES = [
  "restaurant",
  "coiffeur",
  "garage",
  "commerce",
  "artisan_btp",
  "consultant",
  "ecommerce",
  "autre",
] as const;

function orderFromStripeSession(session: Stripe.Checkout.Session): Order {
  const m = session.metadata || {};
  const orderId = (session.client_reference_id || m.order_id) as string;
  const now = new Date().toISOString();
  const customer: CustomerInput = {
    email: m.customer_email || "",
    companyName: m.customer_companyName || "",
    businessType: (BUSINESS_TYPES.includes(m.customer_businessType as any) ? m.customer_businessType : "autre") as CustomerInput["businessType"],
    address: m.customer_address || "",
    website: m.customer_website || "",
    collectsEmails: m.customer_collectsEmails === "1",
    hasCookies: m.customer_hasCookies === "1",
  };
  return {
    id: orderId,
    customer,
    status: "paid_processing",
    createdAt: now,
    updatedAt: now,
  };
}

export class OrderService {
  async createPendingOrder(customer: CustomerInput): Promise<Order> {
    const orders = await storage.getAllOrders();
    const now = new Date().toISOString();

    const order: Order = {
      id: randomUUID(),
      customer,
      status: "pending_payment",
      createdAt: now,
      updatedAt: now,
    };

    orders.push(order);
    await storage.saveAllOrders(orders);

    return order;
  }

  async updateOrder(order: Order): Promise<void> {
    const orders = await storage.getAllOrders();
    const idx = orders.findIndex((o) => o.id === order.id);
    if (idx === -1) {
      orders.push(order);
    } else {
      orders[idx] = order;
    }
    await storage.saveAllOrders(orders);
  }

  async getOrderById(id: string): Promise<Order | undefined> {
    const orders = await storage.getAllOrders();
    return orders.find((o) => o.id === id);
  }

  /** Traite une commande payée (PDF + email). order peut venir du fichier ou des metadata Stripe. */
  async processPaidOrder(orderId: string, session?: Stripe.Checkout.Session): Promise<void> {
    let order: Order | undefined = await this.getOrderById(orderId);
    if (!order && session?.metadata) {
      order = orderFromStripeSession(session);
      console.log("[processPaidOrder] Commande reconstruite depuis metadata Stripe:", orderId);
    } else if (!order) {
      throw new Error("Commande introuvable (fichier et metadata Stripe vides)");
    }

    order.status = "paid_processing";
    order.updatedAt = new Date().toISOString();
    try {
      await this.updateOrder(order);
    } catch {
      // Fichier absent (ex. instance Render différente) : on continue avec les metadata
    }

    console.log("[processPaidOrder] Génération des documents HTML...");
    const documentsHtml = await templateService.generateAllDocuments(order);
    console.log("[processPaidOrder] Génération des PDF...");
    const pdfBuffers = await pdfService.htmlDocumentsToPdfs(documentsHtml);
    console.log("[processPaidOrder] Envoi email à", order.customer.email);
    await emailService.sendDocuments(order.customer.email, pdfBuffers);

    order.status = "completed";
    order.sentAt = new Date().toISOString();
    order.updatedAt = new Date().toISOString();
    try {
      await this.updateOrder(order);
    } catch {
      // Optionnel si order venait des metadata
    }
  }
}


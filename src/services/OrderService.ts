import { randomUUID } from "crypto";
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

  async processPaidOrder(orderId: string): Promise<void> {
    const order = await this.getOrderById(orderId);
    if (!order) {
      throw new Error("Commande introuvable");
    }

    order.status = "paid_processing";
    order.updatedAt = new Date().toISOString();
    await this.updateOrder(order);

    const documentsHtml = await templateService.generateAllDocuments(order);
    const pdfBuffers = await pdfService.htmlDocumentsToPdfs(documentsHtml);

    await emailService.sendDocuments(order.customer.email, pdfBuffers);

    order.status = "completed";
    order.sentAt = new Date().toISOString();
    order.updatedAt = new Date().toISOString();
    await this.updateOrder(order);
  }
}


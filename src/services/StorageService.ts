import fs from "fs";
import path from "path";
import { Order } from "../models/Order";

const ORDERS_FILE = path.join(__dirname, "..", "..", "data", "orders.json");

function ensureFileExists() {
  if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify({ orders: [] }, null, 2), "utf-8");
  }
}

export class StorageService {
  async getAllOrders(): Promise<Order[]> {
    ensureFileExists();
    const raw = fs.readFileSync(ORDERS_FILE, "utf-8");
    const parsed = JSON.parse(raw) as { orders: Order[] };
    return parsed.orders || [];
  }

  async saveAllOrders(orders: Order[]): Promise<void> {
    ensureFileExists();
    const data = { orders };
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(data, null, 2), "utf-8");
  }
}


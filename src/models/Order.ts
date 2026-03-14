import { CustomerInput } from "./CustomerInput";

export type OrderStatus = "pending_payment" | "paid_processing" | "completed" | "failed";

export interface Order {
  id: string;
  customer: CustomerInput;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  sentAt?: string;
  stripeSessionId?: string;
}


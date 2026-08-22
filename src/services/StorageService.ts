import { Order } from "../models/Order";
import { getSupabase } from "../lib/supabaseClient";

/** Fallback en mémoire quand Supabase n'est pas configuré (dev/local). */
const memory = new Map<string, Order>();

const TABLE = "orders";

export class StorageService {
  async getOrder(id: string): Promise<Order | undefined> {
    const sb = getSupabase();
    if (!sb) return memory.get(id);

    const { data, error } = await sb.from(TABLE).select("data").eq("id", id).maybeSingle();
    if (error) {
      console.error("[Supabase] getOrder échec:", error.message);
      return undefined;
    }
    return (data?.data as Order) ?? undefined;
  }

  async upsertOrder(order: Order): Promise<void> {
    const sb = getSupabase();
    if (!sb) {
      memory.set(order.id, order);
      return;
    }

    const { error } = await sb
      .from(TABLE)
      .upsert({ id: order.id, data: order, updated_at: new Date().toISOString() });
    if (error) {
      // On log mais on ne bloque pas le tunnel : la commande vit aussi dans les metadata Stripe.
      console.error("[Supabase] upsertOrder échec:", error.message);
    }
  }
}

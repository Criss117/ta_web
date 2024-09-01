import type { Client } from "@prisma/client";
import { ClientPay } from "../models/types";

export class ClientsToPayAdapter {
  static adapt(clients: Client[] | null | undefined): ClientPay[] | undefined {
    if (!clients) return undefined;

    return clients.map((client) => ({
      id: client.id,
      ccNumber: client.ccNumber,
      fullName: client.fullName,
    }));
  }
}

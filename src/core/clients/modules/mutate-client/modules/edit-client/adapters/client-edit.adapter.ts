import { Client } from "@prisma/client";
import { ClientForm, EditClientInputType } from "../../../models/type";

export class ClientReceivedAdapter {
  static adapt(client: Client | undefined | null): ClientForm | undefined {
    if (!client) return undefined;

    return {
      id: client.id,
      ccNumber: client.ccNumber,
      fullName: client.fullName,
      address: client.address || "",
      phone: client.phone || "",
      creditLimit: client.creditLimit,
    };
  }
}

export class ClientToEditAdapter {
  static adapt(client: ClientForm): EditClientInputType {
    if (!client.id) {
      throw new Error("id not found");
    }

    return {
      id: client.id,
      ccNumber: client.ccNumber,
      fullName: client.fullName,
      address: client.address,
      phone: client.phone,
      creditLimit: client.creditLimit,
    };
  }
}

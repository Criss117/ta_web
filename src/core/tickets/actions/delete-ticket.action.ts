"use server";

import prisma from "@/lib/prisma";
import { validateCatchError } from "@/lib/utils";
import type {
  DeleteTicketinputType,
  DeleteTicketReturnType,
} from "../models/type";

export default async function deleteTicketAction({
  ccNumber,
  id,
}: DeleteTicketinputType): Promise<DeleteTicketReturnType> {
  try {
    await prisma.$transaction(async (tx) => {
      const deletedTicket = await tx.ticket.update({
        where: {
          id,
          client: {
            ccNumber,
          },
        },
        data: {
          deletedAt: new Date(),
          isActive: false,
        },
      });

      if (!deletedTicket) {
        throw new Error("No se pudo eliminar el ticket", {
          cause: "No se pudo eliminar el ticket",
        });
      }

      const client = await tx.client.findUnique({
        where: {
          ccNumber,
          isActive: true,
        },
        select: {
          balance: true,
        },
      });

      if (!client) {
        throw new Error("No se encontro el cliente", {
          cause: "No se encontro el cliente",
        });
      }

      const clientUpdated = await tx.client.update({
        where: {
          ccNumber,
          isActive: true,
        },
        data: {
          balance:
            client.balance < deletedTicket.total
              ? 0
              : client.balance - deletedTicket.total,
        },
      });

      if (!clientUpdated) {
        throw new Error("No se pudo actualizar el cliente", {
          cause: "No se pudo actualizar el cliente",
        });
      }
    });

    return {
      success: true,
    };
  } catch (error) {
    return validateCatchError(error);
  }
}

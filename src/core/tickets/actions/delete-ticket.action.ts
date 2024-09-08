"use server";

import prisma from "@/lib/prisma";
import type {
  DeleteTicketinputType,
  DeleteTicketReturnType,
} from "../models/type";
import { validateCatchError } from "@/lib/utils";

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

      const clientUpdated = await tx.client.update({
        where: {
          ccNumber,
        },
        data: {
          balance: {
            decrement: deletedTicket.total,
          },
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

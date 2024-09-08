"use server";

import { validateCatchError } from "@/lib/utils";
import type {
  SettleDebtInputType,
  SettleDebtReturnType,
} from "../models/types";
import prisma from "@/lib/prisma";

export async function settleDebtAction({
  clientId,
}: SettleDebtInputType): Promise<SettleDebtReturnType> {
  try {
    const res = await prisma.$transaction(async (tx) => {
      const updatedTickets = await tx.ticket.updateMany({
        where: {
          clientId,
          state: "PENDING",
          isActive: true,
        },
        data: {
          state: "PAID",
        },
      });

      if (!updatedTickets.count) {
        throw new Error("No se encontraron tickets pendientes", {
          cause: "No se encontraron tickets pendientes",
        });
      }

      const updatedClient = await tx.client.update({
        where: {
          id: clientId,
        },
        data: {
          balance: 0,
        },
      });

      if (!updatedClient) {
        throw new Error("No se pudo liquidar el abono", {
          cause: "No se pudo liquidar el abono",
        });
      }

      return updatedClient.ccNumber;
    });

    return {
      data: {
        ccNumber: res,
      },
      success: true,
    };
  } catch (error) {
    return validateCatchError(error);
  }
}

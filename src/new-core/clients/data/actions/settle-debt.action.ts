"use server";

import { CommonResponse } from "@Core/common/models/types";
import ClientEntity from "../../domain/entitites/client.entity";
import { validateCatchError } from "@/lib/utils";
import prisma from "@/lib/prisma";

async function settleDebtAction(
  clientId: number
): Promise<CommonResponse<ClientEntity>> {
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

      return updatedClient;
    });

    return {
      statusCode: 201,
      data: {
        ...res,
        tickets: null,
      },
    };
  } catch (error) {
    throw validateCatchError(error);
  }
}

export default settleDebtAction;

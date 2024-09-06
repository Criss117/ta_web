"use server";

import prisma from "@/lib/prisma";
import { sleep, validateCatchError } from "@/lib/utils";
import type {
  CreateDebtPaymentInputType,
  CreateDebtPaymentReturnType,
} from "../models/type";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateDebtPaymentSchema } from "../models/schemas";

export async function createDebtPaymentHandler({
  amount,
  clientId,
}: CreateDebtPaymentInputType): Promise<CreateDebtPaymentReturnType> {
  // await sleep(2000);
  try {
    const res = await prisma.$transaction(async (tx) => {
      const updatedClient = await tx.client.update({
        where: {
          id: clientId,
          balance: {
            gte: +amount,
          },
          isActive: true,
        },
        data: {
          balance: {
            decrement: +amount,
          },
        },
        include: {
          tickets: true,
        },
      });

      if (!updatedClient) {
        throw new Error("No se encontro el cliente", {
          cause: "No se encontro el cliente",
        });
      }

      if (updatedClient.tickets.length === 0) {
        throw new Error("No hay tickets", {
          cause: "No hay tickets",
        });
      }

      await tx.debtPayment.create({
        data: {
          amount: +amount,
          clientId: updatedClient.id,
        },
      });

      return updatedClient;
    });

    return {
      success: true,
      data: res,
    };
  } catch (error) {
    return validateCatchError(error);
  }
}

export const createDebtPaymentAction = createSafeAction(
  CreateDebtPaymentSchema,
  createDebtPaymentHandler
);

"use server";

import prisma from "@/lib/prisma";
import type {
  DeleteDebtPaymentInputType,
  DeleteDebtPaymentReturnType,
} from "../models/type";
import { validateCatchError } from "@/lib/utils";

export async function deleteDebtPaymentAction({
  clientId,
  id,
}: DeleteDebtPaymentInputType): Promise<DeleteDebtPaymentReturnType> {
  try {
    const res = await prisma.$transaction(async (tx) => {
      const deletedDebtPayment = await tx.debtPayment.update({
        where: {
          id,
          client: {
            id: clientId,
          },
        },
        data: {
          isActive: false,
        },
      });

      if (!deletedDebtPayment) {
        throw new Error("No se pudo eliminar el abono", {
          cause: "No se pudo eliminar el abono",
        });
      }

      const updatedClient = await tx.client.update({
        where: {
          id: clientId,
        },
        data: {
          balance: {
            increment: deletedDebtPayment.amount,
          },
        },
      });

      if (!updatedClient) {
        throw new Error("No se pudo actualizar el balance", {
          cause: "No se pudo actualizar el balance",
        });
      }

      return updatedClient.ccNumber;
    });

    return {
      success: true,
      data: {
        ccNumber: res,
      },
    };
  } catch (error) {
    return validateCatchError(error);
  }
}

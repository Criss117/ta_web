"use server";

import prisma from "@/lib/prisma";

import { CommonResponse } from "@Core/common/models/types";
import { BadRequestException } from "@Core/common/errors/expetions";
import { validateCatchError } from "@Core/common/lib/validate-catch-error";

import DebtPaymentWithClient from "../dto/debt-payment-with-client";

async function deleteDebtPaymentAction(
  id: number,
  clientId: number
): Promise<CommonResponse<DebtPaymentWithClient>> {
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
          deletedAt: new Date(),
        },
      });

      if (!deletedDebtPayment) {
        throw new BadRequestException("Payment not found");
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
        throw new BadRequestException("Payment not found");
      }

      return { ...deletedDebtPayment, client: updatedClient };
    });

    return {
      statusCode: 201,
      data: res,
    };
  } catch (error) {
    throw validateCatchError(error);
  }
}

export default deleteDebtPaymentAction;

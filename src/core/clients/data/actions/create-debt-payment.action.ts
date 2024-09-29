"use server";

import prisma from "@/lib/prisma";

import { CommonResponse } from "@Core/common/models/types";
import { BadRequestException } from "@Core/common/errors/expetions";
import { validateCatchError } from "@Core/common/lib/validate-catch-error";

import DebtPaymentWithClient from "../dto/debt-payment-with-client";

async function createDebtPaymentAction(
  clientId: number,
  amount: number
): Promise<CommonResponse<DebtPaymentWithClient>> {
  try {
    const res = await prisma.$transaction(async (tx) => {
      const client = await tx.client.findUnique({
        where: {
          id: clientId,
          isActive: true,
        },
      });

      if (!client || client.balance < amount) {
        throw new BadRequestException("Client not found");
      }

      const newDebtPayment = await tx.debtPayment.create({
        data: {
          amount,
          client: {
            connect: {
              id: clientId,
            },
          },
        },
      });

      if (!newDebtPayment) {
        throw new BadRequestException("Payment not created");
      }

      const updatedClient = await tx.client.update({
        where: {
          id: clientId,
        },
        data: {
          balance: {
            decrement: amount,
          },
        },
      });

      return { ...newDebtPayment, client: updatedClient };
    });

    return {
      statusCode: 201,
      data: res,
    };
  } catch (error) {
    throw validateCatchError(error);
  }
}

export default createDebtPaymentAction;

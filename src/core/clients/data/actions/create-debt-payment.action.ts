"use server";

import prisma from "@/lib/prisma";

import { CommonResponse } from "@Core/common/models/types";

import DebtPaymentWithClient from "../dto/debt-payment-with-client";
import validateError from "@/core/common/lib/validate-errors";
import HttpStatusCodes from "@/core/common/lib/http-status-code";

async function createDebtPaymentAction(
  clientId: number,
  amount: number
): Promise<CommonResponse<DebtPaymentWithClient | null>> {
  try {
    const res = await prisma.$transaction(async (tx) => {
      const client = await tx.client.findUnique({
        where: {
          id: clientId,
          isActive: true,
        },
      });

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
      statusCode: HttpStatusCodes.CREATED.code,
      data: res,
    };
  } catch (error) {
    return validateError(error);
  }
}

export default createDebtPaymentAction;

"use server";

import { CommonResponse } from "@/core/common/models/types";
import prisma from "@/lib/prisma";
import DebtPaymentEntity from "../../domain/entitites/debt-payment.entity";
import { NotFoundException } from "@/core/common/lib/errors/exeptions-handler";

async function findDebtPayByClientIdAction(
  clientId: string
): Promise<CommonResponse<DebtPaymentEntity[] | null>> {
  const debtpayment = await prisma.debtPayment.findMany({
    where: {
      clientId: clientId,
      isActive: true,
    },
  });

  if (!debtpayment) {
    return NotFoundException.exeption("No se encontro el cliente");
  }

  return {
    statusCode: 200,
    data: debtpayment.map((dp) => ({
      ...dp,
      client: null,
    })),
  };
}

export default findDebtPayByClientIdAction;

"use server";

import HttpStatusCodes from "@/core/common/lib/http-status-code";
import { CommonResponse } from "@/core/common/models/types";
import prisma from "@/lib/prisma";
import { DebtPayment } from "@prisma/client";

async function findDebtPaymentbyIdAction(
  id: string
): Promise<CommonResponse<DebtPayment | null>> {
  const debtPayment = await prisma.debtPayment.findUnique({
    where: {
      id,
      isActive: true,
    },
  });

  return {
    statusCode: HttpStatusCodes.OK.code,
    data: debtPayment,
  };
}

export default findDebtPaymentbyIdAction;

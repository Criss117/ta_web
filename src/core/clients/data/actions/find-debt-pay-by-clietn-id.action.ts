"use server";

import prisma from "@/lib/prisma";

async function findDebtPayByClientIdAction(clientId: number) {
  return await prisma.debtPayment.findMany({
    where: {
      clientId: clientId,
      isActive: true,
    },
  });
}

export default findDebtPayByClientIdAction;

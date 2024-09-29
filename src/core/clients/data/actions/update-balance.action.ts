"use server";

import { PrismaTx } from "@Core/common/models/types";

interface UpdateBalanceDto {
  tx?: PrismaTx;
  clientId: number;
  ccNumber: string;
  total: number;
}

async function updateClientBalanceAction(updateBalance: UpdateBalanceDto) {
  const { tx, total, clientId, ccNumber } = updateBalance;

  if (!tx) {
    throw new Error();
  }

  const credit = await tx.client.findUniqueOrThrow({
    where: {
      ccNumber: ccNumber,
      id: clientId,
      isActive: true,
    },
    select: {
      creditLimit: true,
      balance: true,
    },
  });

  const newBalance = credit.balance + total;

  if (newBalance > credit.creditLimit) {
    throw new Error("Limite de credito excedido");
  }

  return await tx.client.update({
    where: {
      ccNumber: ccNumber,
      id: clientId,
      isActive: true,
    },
    data: {
      balance: newBalance,
    },
  });
}

export default updateClientBalanceAction;

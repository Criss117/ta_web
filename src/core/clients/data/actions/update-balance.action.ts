"use server";

import createSyncAction from "@/core/sync-remote/data/actions/create-sync.action";
import {
  SyncOperationEnum,
  SyncTableEnum,
} from "@/core/sync-remote/domain/interfaces/sync-remote";
import { PrismaTx } from "@Core/common/models/types";

interface UpdateBalanceDto {
  tx?: PrismaTx;
  clientId: string;
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
    throw new Error("Limite de credito excedido", {
      cause: "Limite de credito excedido",
    });
  }

  const updatedClient = await tx.client.update({
    where: {
      ccNumber: ccNumber,
      id: clientId,
      isActive: true,
    },
    data: {
      balance: newBalance,
    },
  });

  await createSyncAction(
    {
      operation: SyncOperationEnum.UPDATE,
      tableName: SyncTableEnum.Client,
      recordId: clientId,
    },
    tx
  );

  return updatedClient;
}

export default updateClientBalanceAction;

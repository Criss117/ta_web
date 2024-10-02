"use server";

import { PrismaTx } from "@/core/common/models/types";
import createManySyncAction from "@/core/sync-remote/data/actions/create-many-sync.action";
import {
  SyncOperationEnum,
  SyncTableEnum,
} from "@/core/sync-remote/domain/interfaces/sync-remote";
import prisma from "@/lib/prisma";

async function deleteProductsSaleAction(ticketId: string, tx?: PrismaTx) {
  const prismaToUse = tx || prisma;

  const psIds = await prismaToUse.productSale.findMany({
    where: {
      ticketId,
    },
    select: {
      id: true,
    },
  });

  const res = await prismaToUse.productSale.updateMany({
    where: {
      ticketId,
    },
    data: {
      deletedAt: new Date(),
      isActive: false,
    },
  });

  await createManySyncAction(
    psIds.map((ps) => ({
      operation: SyncOperationEnum.DELETE,
      recordId: ps.id,
      tableName: SyncTableEnum.ProductSale,
    })),
    prismaToUse
  );

  return res;
}

export default deleteProductsSaleAction;

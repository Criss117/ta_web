"use server";

import { PrismaTx } from "@/core/common/models/types";
import deleteProductsSaleAction from "@/core/products-sale/data/actions/delete-products-sale.action";
import createManySyncAction from "@/core/sync-remote/data/actions/create-many-sync.action";
import {
  SyncOperationEnum,
  SyncTableEnum,
} from "@/core/sync-remote/domain/interfaces/sync-remote";
import prisma from "@/lib/prisma";
import { TicketStateEnum } from "../../domain/enums/ticket-state.enum";

async function deleteTicketsAction(clientId: string, tx?: PrismaTx) {
  const prismaToUse = tx || prisma;

  const ticketsId = await prismaToUse.ticket.findMany({
    where: {
      clientId,
    },
    select: {
      id: true,
    },
  });

  const res = await prismaToUse.ticket.updateMany({
    where: {
      clientId,
    },
    data: {
      state: TicketStateEnum.DELETED,
      deletedAt: new Date(),
      isActive: false,
    },
  });

  await createManySyncAction(
    ticketsId.map((t) => ({
      operation: SyncOperationEnum.DELETE,
      recordId: t.id,
      tableName: SyncTableEnum.Ticket,
    })),
    prismaToUse
  );

  const promises = ticketsId.map((t) => {
    return deleteProductsSaleAction(t.id, prismaToUse);
  });

  await Promise.all(promises);

  return res;
}

export default deleteTicketsAction;

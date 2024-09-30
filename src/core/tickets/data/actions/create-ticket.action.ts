"use server";

import CreateTicketDto from "../dto/create-ticket.dto";
import createSyncAction from "@/core/sync-remote/data/actions/create-sync.action";
import {
  SyncOperationEnum,
  SyncTableEnum,
} from "@/core/sync-remote/domain/interfaces/sync-remote";

async function createTicketAction(createTicketDto: CreateTicketDto) {
  const { tx, state, total, clientId } = createTicketDto;

  if (!tx) {
    throw new Error("No se puede crear un ticket sin transacción");
  }

  const createdTicket = await tx.ticket.create({
    data: {
      state,
      total,
      clientId,
    },
  });

  await createSyncAction(
    {
      operation: SyncOperationEnum.CREATE,
      recordId: createdTicket.id,
      tableName: SyncTableEnum.Ticket,
    },
    tx
  );

  return createdTicket;
}

export default createTicketAction;

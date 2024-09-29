"use server";

import CreateTicketDto from "../dto/create-ticket.dto";

async function createTicketAction(createTicketDto: CreateTicketDto) {
  const { tx, state, total, clientId } = createTicketDto;

  if (!tx) {
    throw new Error("No se puede crear un ticket sin transacción");
  }

  return await tx.ticket.create({
    data: {
      state,
      total,
      clientId,
    },
  });
}

export default createTicketAction;

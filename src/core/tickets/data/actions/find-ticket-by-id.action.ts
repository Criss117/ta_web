"use server";

import HttpStatusCodes from "@/core/common/lib/http-status-code";
import { CommonResponse } from "@/core/common/models/types";
import prisma from "@/lib/prisma";
import { Ticket } from "@prisma/client";

async function findTicketByIdAction(
  ticketId: number
): Promise<CommonResponse<Ticket | null>> {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: ticketId,
      isActive: true,
    },
  });

  return {
    statusCode: HttpStatusCodes.OK.code,
    data: ticket,
  };
}

export default findTicketByIdAction;

"use server";

import prisma from "@/lib/prisma";
import { CommonResponse } from "@Core/common/models/types";
import { BadRequestException } from "@Core/common/errors/expetions";
import { validateCatchError } from "@/lib/utils";

async function deleteTicketAction(
  ticketId: number,
  userId: number
): Promise<CommonResponse<null>> {
  try {
    await prisma.$transaction(async (tx) => {
      const client = await tx.client.findUnique({
        where: {
          id: userId,
          isActive: true,
        },
      });

      if (!client) {
        throw new BadRequestException("Client not found");
      }

      const deletedTicket = await tx.ticket.update({
        where: {
          id: ticketId,
          isActive: true,
          client: {
            id: userId,
          },
        },
        data: {
          deletedAt: new Date(),
          isActive: false,
        },
      });

      if (!deletedTicket) {
        throw new BadRequestException("Ticket not found");
      }

      const clientUpdated = await tx.client.update({
        where: {
          id: userId,
          isActive: true,
        },
        data: {
          balance:
            client.balance < deletedTicket.total
              ? 0
              : client.balance - deletedTicket.total,
        },
      });

      if (!clientUpdated) {
        throw new BadRequestException("Client not found");
      }
    });

    return {
      statusCode: 201,
      message: "Ticket deleted successfully",
    };
  } catch (error) {
    throw validateCatchError(error);
  }
}

export default deleteTicketAction;

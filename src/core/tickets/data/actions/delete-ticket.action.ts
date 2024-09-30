"use server";

import ClientEntity from "@/core/clients/domain/entitites/client.entity";
import HttpStatusCodes from "@/core/common/lib/http-status-code";
import validateError from "@/core/common/lib/validate-errors";
import createManySyncAction from "@/core/sync-remote/data/actions/create-many-sync.action";
import {
  SyncOperationEnum,
  SyncTableEnum,
} from "@/core/sync-remote/domain/interfaces/sync-remote";
import prisma from "@/lib/prisma";
import { CommonResponse } from "@Core/common/models/types";

async function deleteTicketAction(
  ticketId: number,
  userId: number
): Promise<CommonResponse<ClientEntity | null>> {
  try {
    const res = await prisma.$transaction(async (tx) => {
      const client = await tx.client.findUnique({
        where: {
          id: userId,
          isActive: true,
        },
      });

      if (!client) {
        throw new Error("No se encontro el cliente", {
          cause: "No se encontro el cliente",
        });
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

      await createManySyncAction(
        [
          {
            operation: SyncOperationEnum.DELETE,
            recordId: deletedTicket.id,
            tableName: SyncTableEnum.Ticket,
          },
          {
            operation: SyncOperationEnum.UPDATE,
            recordId: clientUpdated.id,
            tableName: SyncTableEnum.Client,
          },
        ],
        tx
      );

      return clientUpdated;
    });

    return {
      statusCode: HttpStatusCodes.OK.code,
      data: {
        ...res,
        tickets: null,
      },
    };
  } catch (error) {
    return validateError(error);
  }
}

export default deleteTicketAction;

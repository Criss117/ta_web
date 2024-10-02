"use server";

import prisma from "@/lib/prisma";
import { DeleteClientDto } from "../dto/delete-client.dto";
import { CommonResponse } from "@Core/common/models/types";
import ClientEntity from "../../domain/entitites/client.entity";
import validateError from "@/core/common/lib/validate-errors";
import createSyncAction from "@/core/sync-remote/data/actions/create-sync.action";
import {
  SyncOperationEnum,
  SyncTableEnum,
} from "@/core/sync-remote/domain/interfaces/sync-remote";
import deleteTicketsAction from "@/core/tickets/data/actions/delete-tickets.action";

export async function deleteClientAction({
  ccNumber,
  id,
}: DeleteClientDto): Promise<CommonResponse<ClientEntity | null>> {
  try {
    const res = await prisma.$transaction(async (tx) => {
      const res = await tx.client.update({
        where: {
          ccNumber,
          id,
        },
        data: {
          deletedAt: new Date(),
          isActive: false,
        },
      });

      await createSyncAction(
        {
          operation: SyncOperationEnum.DELETE,
          recordId: res.id,
          tableName: SyncTableEnum.Client,
        },
        tx
      );

      await deleteTicketsAction(res.id, tx);

      return res;
    });

    return {
      statusCode: 201,
      data: {
        ...res,
        tickets: null,
      },
    };
  } catch (error) {
    return validateError(error);
  }
}

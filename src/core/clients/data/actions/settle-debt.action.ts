"use server";

import { CommonResponse } from "@Core/common/models/types";
import ClientEntity from "../../domain/entitites/client.entity";
import prisma from "@/lib/prisma";
import validateError from "@/core/common/lib/validate-errors";
import { BadRequestException } from "@/core/common/lib/errors/exeptions-handler";
import HttpStatusCodes from "@/core/common/lib/http-status-code";
import createSyncAction from "@/core/sync-remote/data/actions/create-sync.action";
import {
  SyncOperationEnum,
  SyncTableEnum,
} from "@/core/sync-remote/domain/interfaces/sync-remote";

async function settleDebtAction(
  clientId: string
): Promise<CommonResponse<ClientEntity | null>> {
  try {
    const res = await prisma.$transaction(async (tx) => {
      await tx.ticket.updateMany({
        where: {
          clientId,
          state: "PENDING",
          isActive: true,
        },
        data: {
          state: "PAID",
        },
      });

      const updatedClient = await tx.client.update({
        where: {
          id: clientId,
        },
        data: {
          balance: 0,
        },
      });

      await createSyncAction(
        {
          operation: SyncOperationEnum.SETTLE_DEBT,
          recordId: clientId,
          tableName: SyncTableEnum.Client,
        },
        tx
      );

      return updatedClient;
    });

    if (!res) {
      return BadRequestException.exeption("No se encontro el cliente");
    }

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

export default settleDebtAction;

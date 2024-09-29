"use server";

import prisma from "@/lib/prisma";

import { CommonResponse } from "@Core/common/models/types";

import DebtPaymentWithClient from "../dto/debt-payment-with-client";
import validateError from "@/core/common/lib/validate-errors";
import HttpStatusCodes from "@/core/common/lib/http-status-code";
import createManySyncAction from "@/core/sync-remote/data/actions/create-many-sync.action";
import {
  SyncOperationEnum,
  SyncTableEnum,
} from "@/core/sync-remote/domain/interfaces/sync-remote";

async function deleteDebtPaymentAction(
  id: number,
  clientId: number
): Promise<CommonResponse<DebtPaymentWithClient | null>> {
  try {
    const res = await prisma.$transaction(async (tx) => {
      const deletedDebtPayment = await tx.debtPayment.update({
        where: {
          id,
          client: {
            id: clientId,
          },
        },
        data: {
          isActive: false,
          deletedAt: new Date(),
        },
      });

      const updatedClient = await tx.client.update({
        where: {
          id: clientId,
        },
        data: {
          balance: {
            increment: deletedDebtPayment.amount,
          },
        },
      });

      await createManySyncAction(
        [
          {
            tableName: SyncTableEnum.DebtPayment,
            operation: SyncOperationEnum.DELETE,
            recordId: deletedDebtPayment.id,
          },
          {
            tableName: SyncTableEnum.Client,
            operation: SyncOperationEnum.UPDATE,
            recordId: updatedClient.id,
          },
        ],
        tx
      );

      return { ...deletedDebtPayment, client: updatedClient };
    });

    return {
      statusCode: HttpStatusCodes.OK.code,
      data: res,
    };
  } catch (error) {
    throw validateError(error);
  }
}

export default deleteDebtPaymentAction;

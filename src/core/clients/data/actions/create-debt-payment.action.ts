"use server";

import prisma from "@/lib/prisma";

import { CommonResponse } from "@Core/common/models/types";

import DebtPaymentWithClient from "../dto/debt-payment-with-client";
import validateError from "@/core/common/lib/validate-errors";
import HttpStatusCodes from "@/core/common/lib/http-status-code";
import createSyncAction from "@/core/sync-remote/data/actions/create-sync.action";
import createManySyncAction from "@/core/sync-remote/data/actions/create-many-sync.action";
import {
  SyncOperationEnum,
  SyncTableEnum,
} from "@/core/sync-remote/domain/interfaces/sync-remote";

async function createDebtPaymentAction(
  clientId: number,
  amount: number
): Promise<CommonResponse<DebtPaymentWithClient | null>> {
  try {
    const res = await prisma.$transaction(async (tx) => {
      const client = await tx.client.findUnique({
        where: {
          id: clientId,
          isActive: true,
        },
      });

      if (!client) {
        throw new Error("No se encontro el cliente", {
          cause: "No se encontro el cliente",
        });
      }

      const newDebtPayment = await tx.debtPayment.create({
        data: {
          amount,
          clientId,
        },
      });

      const updatedClient = await tx.client.update({
        where: {
          id: clientId,
        },
        data: {
          balance: {
            decrement: amount,
          },
        },
      });

      await createManySyncAction(
        [
          {
            tableName: SyncTableEnum.DebtPayment,
            operation: SyncOperationEnum.CREATE,
            recordId: newDebtPayment.id,
          },
          {
            tableName: SyncTableEnum.Client,
            operation: SyncOperationEnum.UPDATE,
            recordId: updatedClient.id,
          },
        ],
        tx
      );

      return { ...newDebtPayment, client: updatedClient };
    });

    return {
      statusCode: HttpStatusCodes.CREATED.code,
      data: res,
    };
  } catch (error) {
    return validateError(error);
  }
}

export default createDebtPaymentAction;

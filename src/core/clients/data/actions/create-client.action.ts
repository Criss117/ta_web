"use server";

import prisma from "@/lib/prisma";

import { CommonResponse } from "@Core/common/models/types";
import ClientEntity from "../../domain/entitites/client.entity";
import { CreateClientDto } from "../dto/create-client.dto";
import validateError from "@Core/common/lib/validate-errors";
import createSyncAction from "@/core/sync-remote/data/actions/create-sync.action";
import {
  SyncOperationEnum,
  SyncTableEnum,
} from "../../../sync-remote/domain/interfaces/sync-remote";

export async function createClientAction(
  clientEntity: CreateClientDto
): Promise<CommonResponse<ClientEntity | null>> {
  try {
    const client = await prisma.$transaction(async (tx) => {
      const client = await tx.client.create({
        data: {
          ccNumber: clientEntity.ccNumber,
          fullName: clientEntity.fullName,
          address: clientEntity.address,
          phone: clientEntity.phone,
          creditLimit: clientEntity.creditLimit,
        },
      });

      await createSyncAction(
        {
          operation: SyncOperationEnum.CREATE,
          recordId: client.id,
          tableName: SyncTableEnum.Client,
        },
        tx
      );

      return client;
    });

    return {
      statusCode: 201,
      message: "Client created successfully",
      data: {
        ...client,
        tickets: null,
      },
    };
  } catch (error) {
    return validateError(error);
  }
}

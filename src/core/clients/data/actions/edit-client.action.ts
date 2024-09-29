"use server";

import { Client } from "@prisma/client";
import prisma from "@/lib/prisma";

import { CommonResponse } from "@Core/common/models/types";
import { EditClientDto } from "../dto/edit-client.dto";
import HttpStatusCodes from "@/core/common/lib/http-status-code";
import validateError from "@/core/common/lib/validate-errors";
import createSyncAction from "@/core/sync-remote/data/actions/create-sync.action";
import {
  SyncOperationEnum,
  SyncTableEnum,
} from "@/core/sync-remote/domain/interfaces/sync-remote";

export async function editClientAction(
  editClientDto: EditClientDto
): Promise<CommonResponse<Client | null>> {
  try {
    const clientEdited = await prisma.$transaction(async (tx) => {
      const clientEdited = await tx.client.update({
        where: {
          id: editClientDto.id,
        },
        data: editClientDto,
      });

      await createSyncAction(
        {
          operation: SyncOperationEnum.UPDATE,
          recordId: clientEdited.id,
          tableName: SyncTableEnum.Client,
        },
        tx
      );

      return clientEdited;
    });

    return {
      statusCode: HttpStatusCodes.CREATED.code,
      data: clientEdited,
    };
  } catch (error) {
    return validateError(error);
  }
}

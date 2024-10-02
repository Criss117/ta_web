"use server";

import { SyncRemote } from "@prisma/client";

import prisma from "@/lib/prisma";
import type { CommonResponse, PrismaTx } from "@/core/common/models/types";
import HttpStatusCodes from "@/core/common/lib/http-status-code";

import type CreateSyncDto from "../dto/create-sync.dto";
import {
  SyncOperationEnum,
  SyncStateEnum,
} from "../../domain/interfaces/sync-remote";
import validateError from "@/core/common/lib/validate-errors";

async function createSyncAction(
  createSyncDto: CreateSyncDto,
  tx?: PrismaTx
): Promise<CommonResponse<SyncRemote | null>> {
  const { tableName, operation, recordId } = createSyncDto;

  const prismToUse = tx || prisma;

  if (createSyncDto.operation === SyncOperationEnum.DELETE) {
    const existsSync = await prismToUse.syncRemote.findMany({
      where: {
        tableName: tableName,
        recordId: recordId,
        operation: {
          not: SyncOperationEnum.DELETE,
        },
        isActive: true,
      },
    });

    existsSync.forEach(async (sync) => {
      await prismToUse.syncRemote.update({
        where: {
          id: sync.id,
        },
        data: {
          isActive: false,
          state: SyncStateEnum.SUCCESS,
        },
      });
    });
  }

  const existsSync = await prismToUse.syncRemote.findFirst({
    where: {
      tableName: tableName,
      operation: operation,
      state: {
        not: SyncStateEnum.SUCCESS,
      },
      recordId: recordId,
      isActive: true,
    },
  });

  if (existsSync) {
    return {
      statusCode: HttpStatusCodes.OK.code,
      data: null,
    };
  }

  try {
    const newSync = await prismToUse.syncRemote.create({
      data: {
        tableName: tableName,
        operation: operation,
        recordId: recordId,
        state: SyncStateEnum.PENDING,
      },
    });

    return {
      statusCode: HttpStatusCodes.CREATED.code,
      data: newSync,
    };
  } catch (error) {
    return validateError(error);
  }
}

export default createSyncAction;

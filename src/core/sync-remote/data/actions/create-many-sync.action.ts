"use server";

import { SyncRemote } from "@prisma/client";

import prisma from "@/lib/prisma";
import type { CommonResponse, PrismaTx } from "@/core/common/models/types";
import HttpStatusCodes from "@/core/common/lib/http-status-code";

import type CreateSyncDto from "../dto/create-sync.dto";
import validateError from "@/core/common/lib/validate-errors";
import createSyncAction from "./create-sync.action";

async function createManySyncAction(
  createManySyncDto: CreateSyncDto[],
  tx?: PrismaTx
): Promise<CommonResponse<SyncRemote[] | null>> {
  const prismToUse = tx || prisma;

  try {
    const promises = createManySyncDto.map(async (c) => {
      return createSyncAction(c, prismToUse);
    });

    const syncs = await Promise.all(promises);

    if (syncs.some((s) => s.data === null || s.data === undefined)) {
      return {
        statusCode: HttpStatusCodes.CREATED.code,
        data: null,
      };
    }

    return {
      statusCode: HttpStatusCodes.OK.code,
      data: syncs.map((s) => s.data as SyncRemote),
    };
  } catch (error) {
    return validateError(error);
  }
}

export default createManySyncAction;

"use server";

import { SyncRemote } from "@prisma/client";
import { CommonResponse } from "@/core/common/models/types";
import HttpStatusCodes from "@/core/common/lib/http-status-code";
import prisma from "@/lib/prisma";
import { SyncStateEnum } from "../../domain/interfaces/sync-remote";

async function findAllSyncAction(): Promise<CommonResponse<SyncRemote[]>> {
  const syncs = await prisma.syncRemote.findMany({
    where: {
      isActive: true,
      state: SyncStateEnum.PENDING,
    },
  });
  return {
    statusCode: HttpStatusCodes.OK.code,
    data: syncs,
  };
}

export default findAllSyncAction;

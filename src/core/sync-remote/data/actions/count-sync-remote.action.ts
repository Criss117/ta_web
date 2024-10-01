"use server";

import HttpStatusCodes from "@/core/common/lib/http-status-code";
import { CommonResponse } from "@/core/common/models/types";
import prisma from "@/lib/prisma";
import { SyncStateEnum } from "../../domain/interfaces/sync-remote";

async function countSyncRemoteAction(): Promise<CommonResponse<number>> {
  const count = await prisma.syncRemote.count({
    where: {
      isActive: true,
      state: SyncStateEnum.PENDING,
    },
  });
  return {
    statusCode: HttpStatusCodes.OK.code,
    data: count,
  };
}

export default countSyncRemoteAction;

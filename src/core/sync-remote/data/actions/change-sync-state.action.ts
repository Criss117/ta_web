"use server";

import prisma from "@/lib/prisma";
import { SyncState } from "../../domain/interfaces/sync-remote";
import HttpStatusCodes from "@/core/common/lib/http-status-code";

async function changeSyncStateAction(syncId: string, syncState: SyncState) {
  const sync = await prisma.syncRemote.update({
    where: {
      id: syncId,
      isActive: true,
    },
    data: {
      state: syncState,
    },
  });

  return {
    statusCode: HttpStatusCodes.OK.code,
    message: "Sincronización actualizada",
    data: sync,
  };
}

export default changeSyncStateAction;

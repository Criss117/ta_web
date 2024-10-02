"use server";

import { CommonResponse } from "@/core/common/models/types";
import { SyncState } from "../../domain/interfaces/sync-remote";
import HttpStatusCodes from "@/core/common/lib/http-status-code";
import prisma from "@/lib/prisma";
import { SyncRemote } from "@prisma/client";
import validateError from "@/core/common/lib/validate-errors";

async function updateSyncsStateAction(
  ids: string[],
  state: SyncState
): Promise<CommonResponse<SyncRemote[] | null>> {
  try {
    const promises = ids.map(async (id) => {
      return prisma.syncRemote.update({
        where: {
          id,
        },
        data: {
          state,
          lastSync: new Date(),
        },
      });
    });

    const syncs = await Promise.all(promises);

    return {
      statusCode: HttpStatusCodes.OK.code,
      message: "Sincronización actualizada",
      data: syncs,
    };
  } catch (error) {
    return validateError(error);
  }
}

export default updateSyncsStateAction;

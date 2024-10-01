"use server";

import HttpStatusCodes from "@/core/common/lib/http-status-code";
import { CommonResponse } from "@/core/common/models/types";
import { SyncRemote } from "@prisma/client";
import ResponseToSendDto from "../dto/response-to-send.dto";
import { SyncState } from "../../domain/interfaces/sync-remote";
import SyncRemoteUseCasesFactory from "../../composition-root/sync-remote-usecases.factory";
import SyncRemoteMapper from "../mappper/sync-remote.mapper";
import SyncRemoteEntity from "../../domain/entities/sync-remote.entity";

async function sendSyncsAction(
  syncRemote: SyncRemote[]
): Promise<CommonResponse<ResponseToSendDto[]>> {
  const syncsToSend = syncRemote.map((s) => {
    return {
      tableName: s.tableName,
      operation: s.operation,
      recordId: s.recordId,
    };
  });

  const syncsEntity: SyncRemoteEntity[] = syncRemote.map(
    SyncRemoteMapper.prismaEntityToDomain
  );

  const syncRemoteAction = SyncRemoteUseCasesFactory.createService();

  await syncRemoteAction.synchronize(syncsEntity);

  return {
    statusCode: HttpStatusCodes.OK.code,
    data: syncRemote.map((s) => ({
      syncId: s.id,
      state: s.state as SyncState,
      error: null,
    })),
  };
}

export default sendSyncsAction;

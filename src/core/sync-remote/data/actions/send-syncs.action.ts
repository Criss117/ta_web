"use server";

import HttpStatusCodes from "@/core/common/lib/http-status-code";
import { CommonResponse } from "@/core/common/models/types";
import { SyncRemote } from "@prisma/client";
import ResponseToSendDto from "../dto/response-to-send.dto";
import { SyncState, SyncStateEnum } from "../../domain/interfaces/sync-remote";
import SyncRemoteUseCasesFactory from "../../composition-root/sync-remote-usecases.factory";
import SyncRemoteMapper from "../mappper/sync-remote.mapper";
import SyncRemoteEntity from "../../domain/entities/sync-remote.entity";
import { axiosInstance } from "@/core/common/lib/networking";
import ApiEndpoints from "@/core/common/lib/constants/api-endpoints";
import validateError from "@/core/common/lib/validate-errors";
import prisma from "@/lib/prisma";
import updateSyncsStateAction from "./update-sync-state.action";

async function sendSyncsAction(
  syncRemote: SyncRemote[]
): Promise<CommonResponse<ResponseToSendDto[] | null>> {
  const syncsEntity: SyncRemoteEntity[] = syncRemote.map(
    SyncRemoteMapper.prismaEntityToDomain
  );

  const syncRemoteAction = SyncRemoteUseCasesFactory.createService();

  const res = await syncRemoteAction.synchronize(syncsEntity);

  try {
    const { data, status } = await axiosInstance.post(
      ApiEndpoints.SYNCHRONIZATION,
      { ...res }
    );

    const ids = syncsEntity.map((s) => s.id);

    if (status !== HttpStatusCodes.CREATED.code) {
      await updateSyncsStateAction(ids, SyncStateEnum.FAILED);

      return {
        statusCode: status,
        error: data.message,
        message: data.message,
      };
    }

    await updateSyncsStateAction(ids, SyncStateEnum.SUCCESS);

    return {
      statusCode: HttpStatusCodes.OK.code,
      data: syncRemote.map((s) => ({
        syncId: s.id,
        state: s.state as SyncState,
        error: null,
      })),
    };
  } catch (error) {
    return validateError(error);
  }
}

export default sendSyncsAction;

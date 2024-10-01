import { CommonResponse } from "@/core/common/models/types";
import SyncRemoteEntity from "../../domain/entities/sync-remote.entity";
import type SyncRemoteRepository from "../../domain/repositories/sync-remote.repository";
import createSyncAction from "../actions/create-sync.action";
import SyncRemoteMapper from "../mappper/sync-remote.mapper";
import { NotFoundException } from "@/core/common/lib/errors/exeptions-handler";
import HttpStatusCodes from "@/core/common/lib/http-status-code";
import countSyncRemoteAction from "../actions/count-sync-remote.action";
import findAllSyncAction from "../actions/find-all.action";
import { SyncState, SyncStateEnum } from "../../domain/interfaces/sync-remote";
import sendSyncsAction from "../actions/send-syncs.action";
import changeSyncStateAction from "../actions/change-sync-state.action";

class SyncRemoteRepositoryImpl implements SyncRemoteRepository {
  private static instance: SyncRemoteRepositoryImpl;

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new SyncRemoteRepositoryImpl();
    }
    return this.instance;
  }

  async syncRemote(): Promise<CommonResponse> {
    const syncs = await findAllSyncAction();

    if (!syncs.data) {
      return {
        statusCode: HttpStatusCodes.OK.code,
        message: "No hay sincronizaciones pendientes",
        data: null,
      };
    }

    const syncsSends = await sendSyncsAction(syncs.data);

    if (!syncsSends.data || syncsSends.error) {
      return {
        statusCode: syncsSends.statusCode,
        error: syncsSends.error,
        message: syncsSends.message,
      };
    }

    // const promise = syncsSends.data.map(async (s) => {
    //   return changeSyncStateAction(s.syncId, s.state);
    // });

    // await Promise.all(promise);

    return {
      statusCode: syncs.statusCode,
      error: syncs.error,
      message: syncs.message,
    };
  }

  async changeSyncState(
    syncId: number,
    state: SyncState
  ): Promise<CommonResponse<SyncRemoteEntity | null>> {
    throw new Error("Method not implemented.");
  }

  async countAll(): Promise<CommonResponse<number | null>> {
    return countSyncRemoteAction();
  }

  async findALl(): Promise<CommonResponse<SyncRemoteEntity[] | null>> {
    const syncs = await findAllSyncAction();

    return {
      statusCode: syncs.statusCode,
      error: syncs.error,
      message: syncs.message,
      data: syncs.data?.map(SyncRemoteMapper.prismaEntityToDomain),
    };
  }

  async create(
    entity: SyncRemoteEntity
  ): Promise<CommonResponse<SyncRemoteEntity | null>> {
    const newSync = await createSyncAction(
      SyncRemoteMapper.domainToCreateDto(entity)
    );

    if (newSync.statusCode !== HttpStatusCodes.CREATED.code || !newSync.data) {
      return NotFoundException.exeption(newSync.error);
    }

    return {
      statusCode: newSync.statusCode,
      data: SyncRemoteMapper.prismaEntityToDomain(newSync.data),
    };
  }
}

export default SyncRemoteRepositoryImpl;

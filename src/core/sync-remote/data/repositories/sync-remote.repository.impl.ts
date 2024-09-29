import { CommonResponse } from "@/core/common/models/types";
import SyncRemoteEntity from "../../domain/entities/sync-remote.entity";
import type SyncRemoteRepository from "../../domain/repositories/sync-remote.repository";
import createSyncAction from "../actions/create-sync.action";
import SyncRemoteMapper from "../mappper/sync-remote.mapper";
import { NotFoundException } from "@/core/common/lib/errors/exeptions-handler";
import HttpStatusCodes from "@/core/common/lib/http-status-code";

class SyncRemoteRepositoryImpl implements SyncRemoteRepository {
  private static instance: SyncRemoteRepositoryImpl;

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new SyncRemoteRepositoryImpl();
    }
    return this.instance;
  }

  findALl(): Promise<CommonResponse<SyncRemoteEntity[] | null>> {
    throw new Error("Method not implemented.");
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

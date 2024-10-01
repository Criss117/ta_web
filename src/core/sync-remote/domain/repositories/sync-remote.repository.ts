import { CommonResponse } from "@/core/common/models/types";
import SyncRemoteEntity from "../entities/sync-remote.entity";
import type { SyncState } from "../interfaces/sync-remote";

interface SyncRemoteRepository {
  changeSyncState(
    syncId: string,
    state: SyncState
  ): Promise<CommonResponse<SyncRemoteEntity | null>>;
  syncRemote(): Promise<CommonResponse>;
  countAll(): Promise<CommonResponse<number | null>>;
  findALl(): Promise<CommonResponse<SyncRemoteEntity[] | null>>;
  create(
    entity: SyncRemoteEntity
  ): Promise<CommonResponse<SyncRemoteEntity | null>>;
}

export default SyncRemoteRepository;

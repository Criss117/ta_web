import { CommonResponse } from "@/core/common/models/types";
import SyncRemoteEntity from "../entities/sync-remote.entity";

interface SyncRemoteRepository {
  findALl(): Promise<CommonResponse<SyncRemoteEntity[] | null>>;
  create(
    entity: SyncRemoteEntity
  ): Promise<CommonResponse<SyncRemoteEntity | null>>;
}

export default SyncRemoteRepository;

import { SyncRemote } from "@prisma/client";
import SyncRemoteEntity from "../../domain/entities/sync-remote.entity";
import type {
  SyncOperation,
  SyncState,
  TableName,
} from "../../domain/interfaces/sync-remote";
import type CreateSyncDto from "../dto/create-sync.dto";

class SyncRemoteMapper {
  static domainToCreateDto(syncRemoteEntity: SyncRemoteEntity): CreateSyncDto {
    return {
      tableName: syncRemoteEntity.tableName as TableName,
      operation: syncRemoteEntity.operation as SyncOperation,
      recordId: syncRemoteEntity.recordId,
    };
  }

  static prismaEntityToDomain(syncRemote: SyncRemote): SyncRemoteEntity {
    return SyncRemoteEntity.builder()
      .id(syncRemote.id)
      .tableName(syncRemote.tableName as TableName)
      .state(syncRemote.state as SyncState)
      .error(syncRemote.error)
      .lastSync(syncRemote.lastSync)
      .recorId(syncRemote.recordId)
      .operation(syncRemote.operation as SyncOperation)
      .createdAt(syncRemote.createdAt)
      .updatedAt(syncRemote.updatedAt)
      .deletedAt(syncRemote.deletedAt)
      .isActive(syncRemote.isActive)
      .build();
  }
}

export default SyncRemoteMapper;

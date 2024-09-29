import type {
  SyncOperation,
  TableName,
} from "../../domain/interfaces/sync-remote";

interface CreateSyncDto {
  tableName: TableName;
  operation: SyncOperation;
  recordId: number;
}

export default CreateSyncDto;

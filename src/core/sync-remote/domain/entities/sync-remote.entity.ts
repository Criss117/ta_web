import type {
  SyncOperation,
  SyncState,
  TableName,
} from "../interfaces/sync-remote";

class SyncRemoteEntity {
  id: string = "";
  tableName: TableName | null = null;
  state: SyncState | null = null;
  error: string | null = null;
  lastSync: Date | null = null;
  recordId: string = "";
  operation: SyncOperation | null = null;
  createdAt: Date | null = null;
  updatedAt: Date | null = null;
  deletedAt: Date | null = null;
  isActive: boolean = false;

  constructor() {}

  static builder() {
    return new SyncRemoteEntityBuilder();
  }
}

class SyncRemoteEntityBuilder {
  private syncRemoteEntity = new SyncRemoteEntity();

  id(id: string) {
    this.syncRemoteEntity.id = id;
    return this;
  }

  tableName(tableName: TableName | null) {
    this.syncRemoteEntity.tableName = tableName;
    return this;
  }

  state(state: SyncState | null) {
    this.syncRemoteEntity.state = state;
    return this;
  }

  error(error: string | null) {
    this.syncRemoteEntity.error = error;
    return this;
  }

  lastSync(lastSync: Date | null) {
    this.syncRemoteEntity.lastSync = lastSync;
    return this;
  }

  recorId(recordId: string) {
    this.syncRemoteEntity.recordId = recordId;
    return this;
  }

  operation(operation: SyncOperation | null) {
    this.syncRemoteEntity.operation = operation;
    return this;
  }

  createdAt(createdAt: Date | null) {
    this.syncRemoteEntity.createdAt = createdAt;
    return this;
  }

  updatedAt(updatedAt: Date | null) {
    this.syncRemoteEntity.updatedAt = updatedAt;
    return this;
  }

  deletedAt(deletedAt: Date | null) {
    this.syncRemoteEntity.deletedAt = deletedAt;
    return this;
  }

  isActive(isActive: boolean) {
    this.syncRemoteEntity.isActive = isActive;
    return this;
  }

  build() {
    return this.syncRemoteEntity;
  }
}

export default SyncRemoteEntity;

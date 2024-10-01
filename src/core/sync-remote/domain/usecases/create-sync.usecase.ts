import SyncRemoteEntity from "../entities/sync-remote.entity";
import type SyncRemoteRepository from "../repositories/sync-remote.repository";

class CreateSyncUseCase {
  private static instance: CreateSyncUseCase;

  private constructor(
    private readonly syncRemoteRepository: SyncRemoteRepository
  ) {}

  static getInstance(syncRemoteRepository: SyncRemoteRepository) {
    if (!this.instance) {
      this.instance = new CreateSyncUseCase(syncRemoteRepository);
    }
    return this.instance;
  }

  execute(syncRemote: SyncRemoteEntity) {
    return this.syncRemoteRepository.create(syncRemote);
  }
}

export default CreateSyncUseCase;

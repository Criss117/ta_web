import type SyncRemoteRepository from "../repositories/sync-remote.repository";

class CountSyncUseCase {
  private static instance: CountSyncUseCase;

  private constructor(
    private readonly syncRemoteRepository: SyncRemoteRepository
  ) {}

  static getInstance(syncRemoteRepository: SyncRemoteRepository) {
    if (!this.instance) {
      this.instance = new CountSyncUseCase(syncRemoteRepository);
    }
    return this.instance;
  }

  execute() {
    return this.syncRemoteRepository.countAll();
  }
}

export default CountSyncUseCase;

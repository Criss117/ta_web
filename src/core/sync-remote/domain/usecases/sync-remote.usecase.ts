import type SyncRemoteRepository from "../repositories/sync-remote.repository";

class SyncRemoteUseCase {
  private static instance: SyncRemoteUseCase;

  private constructor(
    private readonly syncRemoteRepository: SyncRemoteRepository
  ) {}

  static getInstance(syncRemoteRepository: SyncRemoteRepository) {
    if (!this.instance) {
      this.instance = new SyncRemoteUseCase(syncRemoteRepository);
    }
    return this.instance;
  }

  execute() {
    return this.syncRemoteRepository.syncRemote();
  }
}

export default SyncRemoteUseCase;

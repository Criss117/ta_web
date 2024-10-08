import type SyncRemoteRepository from "../repositories/sync-remote.repository";

class FindALlSyncUsecase {
  private static instance: FindALlSyncUsecase;

  private constructor(
    private readonly syncRemoteRepository: SyncRemoteRepository
  ) {}

  static getInstance(syncRemoteRepository: SyncRemoteRepository) {
    if (!this.instance) {
      this.instance = new FindALlSyncUsecase(syncRemoteRepository);
    }
    return this.instance;
  }

  execute() {
    return this.syncRemoteRepository.findALl();
  }
}

export default FindALlSyncUsecase;

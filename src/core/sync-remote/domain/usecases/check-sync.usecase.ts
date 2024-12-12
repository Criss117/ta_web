import type SyncRemoteRepository from "../repositories/sync-remote.repository";
import SyncRemoteUseCase from "./sync-remote.usecase";

class CheckSyncUseCase {
  private static instance: CheckSyncUseCase;

  private constructor(
    private readonly syncRemoteRepository: SyncRemoteRepository,
    private readonly syncRemoteUseCase: SyncRemoteUseCase
  ) {}

  static getInstance(
    syncRemoteRepository: SyncRemoteRepository,
    syncRemoteUseCase: SyncRemoteUseCase
  ) {
    if (!this.instance) {
      this.instance = new CheckSyncUseCase(
        syncRemoteRepository,
        syncRemoteUseCase
      );
    }
    return this.instance;
  }

  execute() {
    this.syncRemoteRepository.countAll().then((response) => {
      if (response.data && response.data > 0) {
        this.syncRemoteUseCase.execute();
      }
    });
  }
}

export default CheckSyncUseCase;

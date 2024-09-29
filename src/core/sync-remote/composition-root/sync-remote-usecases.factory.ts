import SyncRemoteRepositoryImpl from "../data/repositories/sync-remote.repository.impl";
import CreateSyncUseCase from "../domain/usecases/create-sync.usecase";

class SyncRemoteUseCasesFactory {
  private static syncRemoteRepository = SyncRemoteRepositoryImpl.getInstance();

  static createCreateSyncRemote() {
    return CreateSyncUseCase.getInstance(this.syncRemoteRepository);
  }
}

export default SyncRemoteUseCasesFactory;

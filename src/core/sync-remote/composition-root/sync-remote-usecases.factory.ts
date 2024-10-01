import ClientRepositoryImlp from "@/core/clients/data/repositories/client.repository.impl";
import SyncRemoteRepositoryImpl from "../data/repositories/sync-remote.repository.impl";
import SyncRemoteService from "../domain/service/sync-remote.service";
import CountSyncUseCase from "../domain/usecases/count-sync.usecase";
import CreateSyncUseCase from "../domain/usecases/create-sync.usecase";
import SyncRemoteUseCase from "../domain/usecases/sync-remote.usecase";
import ProductRepositoryImpl from "@/core/products/data/repositories/product.repository.impl";
import TicketsRepositoryImpl from "@/core/tickets/data/repositories/tickets.repository.impl";
import ProductsSaleRepositoryImpl from "@/core/products-sale/data/repositories/products-sale.repository.impl";
import DebtPaysRepositoryImpl from "@/core/clients/data/repositories/debt-pays.repository.impl";

class SyncRemoteUseCasesFactory {
  private static syncRemoteRepository = SyncRemoteRepositoryImpl.getInstance();
  private static clientRepository = ClientRepositoryImlp.getInstance();
  private static productRepository = ProductRepositoryImpl.getInstance();
  private static ticketsRepository = TicketsRepositoryImpl.getInstance();
  private static productsSaleRepository =
    ProductsSaleRepositoryImpl.getInstance();
  private static debtPaysRepository = DebtPaysRepositoryImpl.getInstance();

  static createCreateSyncRemote() {
    return CreateSyncUseCase.getInstance(this.syncRemoteRepository);
  }

  static createCountSyncRemote() {
    return CountSyncUseCase.getInstance(this.syncRemoteRepository);
  }

  static createSyncRemote() {
    return SyncRemoteUseCase.getInstance(this.syncRemoteRepository);
  }

  static createService() {
    return SyncRemoteService.getInstance(
      this.clientRepository,
      this.productRepository,
      this.ticketsRepository,
      this.productsSaleRepository,
      this.debtPaysRepository
    );
  }
}

export default SyncRemoteUseCasesFactory;

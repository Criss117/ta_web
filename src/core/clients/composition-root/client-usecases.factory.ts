import ClientRepositoryImlp from "../data/repositories/client.repository.impl";
import CreateClientUseCase from "../domain/usecases/create-client.usecase";
import DeleteClientUseCase from "../domain/usecases/delete-client.usecase";
import EditClientUseCase from "../domain/usecases/edit-client.usecase";
import FindByIdOrCcNumberUseCase from "../domain/usecases/find-by-id-or-ccnumber.usecase";
import FindClientsUseCase from "../domain/usecases/find-clients.usecase";
import SettleDebtUseCase from "../domain/usecases/settle-debt.usecase";

class ClientUseCasesFactory {
  private static clientRepository = ClientRepositoryImlp.getInstance();

  static createFindClients() {
    return FindClientsUseCase.getInstance(this.clientRepository);
  }

  static createCreateClient() {
    return new CreateClientUseCase(this.clientRepository);
  }

  static createDeleteClient() {
    return new DeleteClientUseCase(this.clientRepository);
  }

  static createFindByIdOrCcNumber() {
    return new FindByIdOrCcNumberUseCase(this.clientRepository);
  }

  static createEditClient() {
    return EditClientUseCase.getInstance(this.clientRepository);
  }

  static createSettleDebt() {
    return SettleDebtUseCase.getInstance(this.clientRepository);
  }
}

export default ClientUseCasesFactory;

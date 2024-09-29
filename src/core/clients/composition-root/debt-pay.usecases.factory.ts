import DebtPaysRepositoryImpl from "../data/repositories/debt-pays.repository.impl";
import CreateDebtPaymentUseCase from "../domain/usecases/create-debt-payment.usecase";
import DeleteDebtPayUseCase from "../domain/usecases/delete-debt-pay.usecase";
import FindDebtPayUseCase from "../domain/usecases/find-debt-pay-by-client.usecase";

class DebtPaysUseCasesFactory {
  private static debtPaysRepository = DebtPaysRepositoryImpl.getInstance();

  public static createFindByClientId() {
    return FindDebtPayUseCase.getInstance(this.debtPaysRepository);
  }

  public static createDeleteDebtPay() {
    return DeleteDebtPayUseCase.getInstance(this.debtPaysRepository);
  }

  public static createCreateDebtPay() {
    return CreateDebtPaymentUseCase.getInstance(this.debtPaysRepository);
  }
}

export default DebtPaysUseCasesFactory;

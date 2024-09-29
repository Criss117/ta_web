import DebtPaymentEntity from "../entitites/debt-payment.entity";
import DebtPaysRepository from "../repositories/debt-pays.repository";

class DeleteDebtPayUseCase {
  private static instance: DeleteDebtPayUseCase;

  private constructor(
    private readonly debtPaysRepository: DebtPaysRepository
  ) {}

  static getInstance(
    debtPaysRepository: DebtPaysRepository
  ): DeleteDebtPayUseCase {
    if (!this.instance) {
      this.instance = new DeleteDebtPayUseCase(debtPaysRepository);
    }
    return this.instance;
  }

  async execute(id: number, clientId: number): Promise<DebtPaymentEntity> {
    return await this.debtPaysRepository.deleteDebtPayment(id, clientId);
  }
}

export default DeleteDebtPayUseCase;

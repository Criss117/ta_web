import DebtPaymentEntity from "../entitites/debt-payment.entity";
import DebtPaysRepository from "../repositories/debt-pays.repository";

class FindDebtPayUseCase {
  private static instance: FindDebtPayUseCase;

  private constructor(
    private readonly debtPaysRepository: DebtPaysRepository
  ) {}

  static getInstance(
    debtPaysRepository: DebtPaysRepository
  ): FindDebtPayUseCase {
    if (!FindDebtPayUseCase.instance) {
      FindDebtPayUseCase.instance = new FindDebtPayUseCase(debtPaysRepository);
    }
    return FindDebtPayUseCase.instance;
  }

  async execute(clientId: number): Promise<Array<DebtPaymentEntity>> {
    return await this.debtPaysRepository.findByClientId(clientId);
  }
}

export default FindDebtPayUseCase;

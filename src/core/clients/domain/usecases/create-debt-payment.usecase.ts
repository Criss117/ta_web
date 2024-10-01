import DebtPaysRepository from "../repositories/debt-pays.repository";

class CreateDebtPaymentUseCase {
  private static instance: CreateDebtPaymentUseCase;

  private constructor(
    private readonly debtPaysRepository: DebtPaysRepository
  ) {}

  public static getInstance(
    debtPaysRepository: DebtPaysRepository
  ): CreateDebtPaymentUseCase {
    if (!this.instance) {
      this.instance = new CreateDebtPaymentUseCase(debtPaysRepository);
    }
    return this.instance;
  }

  public async execute(clientId: string, amount: number) {
    return this.debtPaysRepository.createDebtPayment(clientId, amount);
  }
}

export default CreateDebtPaymentUseCase;

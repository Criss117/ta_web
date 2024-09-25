import DebtPaymentEntity from "../entitites/debt-payment.entity";
import DebtPaysRepository from "../repositories/debt-pays.repository";

class CreateDebtPaymentUseCase {
  private static instance: CreateDebtPaymentUseCase;

  private constructor(
    private readonly debtPaysRepository: DebtPaysRepository
  ) {}

  public static getInstance(
    debtPaysRepository: DebtPaysRepository
  ): CreateDebtPaymentUseCase {
    if (!CreateDebtPaymentUseCase.instance) {
      CreateDebtPaymentUseCase.instance = new CreateDebtPaymentUseCase(
        debtPaysRepository
      );
    }
    return CreateDebtPaymentUseCase.instance;
  }

  public async execute(
    clientId: number,
    amount: number
  ): Promise<DebtPaymentEntity> {
    return this.debtPaysRepository.createDebtPayment(clientId, amount);
  }
}

export default CreateDebtPaymentUseCase;

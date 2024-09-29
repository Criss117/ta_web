import ClientEntity from "../entitites/client.entity";
import DebtPaymentEntity from "../entitites/debt-payment.entity";

interface DebtPaysRepository {
  createDebtPayment(
    clientId: number,
    amount: number
  ): Promise<DebtPaymentEntity>;

  findByClientId(clientId: number): Promise<DebtPaymentEntity[]>;

  deleteDebtPayment(id: number, clientId: number): Promise<DebtPaymentEntity>;
}

export default DebtPaysRepository;

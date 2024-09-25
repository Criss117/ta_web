import DebtPaymentEntity from "../../domain/entitites/debt-payment.entity";
import DebtPaysRepository from "../../domain/repositories/debt-pays.repository";
import createDebtPaymentAction from "../actions/create-debt-payment.action";
import deleteDebtPaymentAction from "../actions/delete-debt-payment.action";
import findDebtPayByClientIdAction from "../actions/find-debt-pay-by-clietn-id.action";
import DebtPayMapper from "../mappers/debt-pay.mapper";

class DebtPaysRepositoryImpl implements DebtPaysRepository {
  private static instance: DebtPaysRepositoryImpl;

  private constructor() {}

  static getInstance(): DebtPaysRepositoryImpl {
    if (!DebtPaysRepositoryImpl.instance) {
      DebtPaysRepositoryImpl.instance = new DebtPaysRepositoryImpl();
    }
    return DebtPaysRepositoryImpl.instance;
  }

  async findByClientId(clientId: number): Promise<DebtPaymentEntity[]> {
    const debtPays = await findDebtPayByClientIdAction(clientId);

    return debtPays.map(DebtPayMapper.toDomain);
  }

  async deleteDebtPayment(
    id: number,
    clientId: number
  ): Promise<DebtPaymentEntity> {
    const deletedDebtPayment = await deleteDebtPaymentAction(id, clientId);

    if (!deletedDebtPayment.data) {
      throw new Error("No se pudo eliminar el abono", {
        cause: "No se pudo eliminar el abono",
      });
    }

    return DebtPayMapper.toDomainWithClient(deletedDebtPayment.data);
  }

  async createDebtPayment(
    clientId: number,
    amount: number
  ): Promise<DebtPaymentEntity> {
    const createdDebtPayment = await createDebtPaymentAction(clientId, amount);

    if (!createdDebtPayment.data) {
      throw new Error("No se pudo crear el abono", {
        cause: "No se pudo crear el abono",
      });
    }

    return DebtPayMapper.toDomainWithClient(createdDebtPayment.data);
  }
}

export default DebtPaysRepositoryImpl;

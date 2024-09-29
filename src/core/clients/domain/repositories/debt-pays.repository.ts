import ClientEntity from "../entitites/client.entity";
import DebtPaymentEntity from "../entitites/debt-payment.entity";
import { CommonResponse } from "../../../common/models/types";

interface DebtPaysRepository {
  createDebtPayment(
    clientId: number,
    amount: number
  ): Promise<CommonResponse<DebtPaymentEntity | null>>;

  findByClientId(
    clientId: number
  ): Promise<CommonResponse<DebtPaymentEntity[] | null>>;

  deleteDebtPayment(
    id: number,
    clientId: number
  ): Promise<CommonResponse<DebtPaymentEntity | null>>;
}

export default DebtPaysRepository;

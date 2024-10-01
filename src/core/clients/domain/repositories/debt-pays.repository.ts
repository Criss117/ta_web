import DebtPaymentEntity from "../entitites/debt-payment.entity";
import { CommonResponse } from "../../../common/models/types";

interface DebtPaysRepository {
  createDebtPayment(
    clientId: string,
    amount: number
  ): Promise<CommonResponse<DebtPaymentEntity | null>>;

  findByClientId(
    clientId: string
  ): Promise<CommonResponse<DebtPaymentEntity[] | null>>;

  deleteDebtPayment(
    id: string,
    clientId: string
  ): Promise<CommonResponse<DebtPaymentEntity | null>>;

  findById(id: string): Promise<CommonResponse<DebtPaymentEntity | null>>;
}

export default DebtPaysRepository;

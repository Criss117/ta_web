import { DebtPayment } from "@prisma/client";
import DebtPaymentEntity from "../../domain/entitites/debt-payment.entity";
import DebtPaymentWithClient from "../dto/debt-payment-with-client";
import ClientEntity from "../../domain/entitites/client.entity";

class DebtPayMapper {
  static toDomain(debtPay: DebtPayment): DebtPaymentEntity {
    return DebtPaymentEntity.builder()
      .id(debtPay.id)
      .amount(debtPay.amount)
      .clientId(debtPay.clientId)
      .createdAt(debtPay.createdAt)
      .build();
  }

  static toDomainWithClient(debtPay: DebtPaymentWithClient): DebtPaymentEntity {
    const client = ClientEntity.builder()
      .id(debtPay.client.id)
      .ccNumber(debtPay.client.ccNumber)
      .build();

    return DebtPaymentEntity.builder()
      .id(debtPay.id)
      .amount(debtPay.amount)
      .clientId(debtPay.clientId)
      .client(client)
      .createdAt(debtPay.createdAt)
      .build();
  }
}

export default DebtPayMapper;

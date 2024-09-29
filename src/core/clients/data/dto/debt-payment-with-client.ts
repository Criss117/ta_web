import { Client, DebtPayment } from "@prisma/client";

interface DebtPaymentWithClient extends DebtPayment {
  client: Client;
}

export default DebtPaymentWithClient;

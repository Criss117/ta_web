import { PrismaTx } from "@Core/common/models/types";

interface CreateTicketDto {
  tx: PrismaTx;
  state: "PENDING" | "PAID";
  total: number;
  clientId?: string;
}

export default CreateTicketDto;

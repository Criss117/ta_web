import { ProductSale, Ticket } from "@prisma/client";

interface TicketCreatedDto extends Ticket {
  productSale: ProductSale[];
}

export default TicketCreatedDto;

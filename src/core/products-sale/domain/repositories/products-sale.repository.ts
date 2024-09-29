import ProductSaleEntity from "../entities/product-sale.entity";
import { FindByTicket } from "../interfaces/find-by-ticket";

export interface ProductsSaleRepository {
  findByTicketId: (
    findByTicket: FindByTicket
  ) => Promise<Array<ProductSaleEntity>>;
}

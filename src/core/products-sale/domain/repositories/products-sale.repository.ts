import ProductSaleEntity from "../entities/product-sale.entity";
import { FindByTicket } from "../interfaces/find-by-ticket";
import { CommonResponse } from "../../../common/models/types";

export interface ProductsSaleRepository {
  findByTicketId: (
    findByTicket: FindByTicket
  ) => Promise<CommonResponse<Array<ProductSaleEntity> | null>>;

  findById: (id: string) => Promise<CommonResponse<ProductSaleEntity | null>>;
}

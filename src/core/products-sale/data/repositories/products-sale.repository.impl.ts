import { NotFoundException } from "@Core/common/errors/expetions";
import ProductSaleEntity from "../../domain/entities/product-sale.entity";
import { FindByTicket } from "../../domain/interfaces/find-by-ticket";
import { ProductsSaleRepository } from "../../domain/repositories/products-sale.repository";
import { findByTicketAction } from "../actions/find-by-ticket.action";
import ProductsSaleMapper from "../mappers/products-sale.mapper";

class ProductsSaleRepositoryImpl implements ProductsSaleRepository {
  private static instance: ProductsSaleRepositoryImpl;

  static getInstance(): ProductsSaleRepositoryImpl {
    if (!ProductsSaleRepositoryImpl.instance) {
      ProductsSaleRepositoryImpl.instance = new ProductsSaleRepositoryImpl();
    }
    return ProductsSaleRepositoryImpl.instance;
  }

  async findByTicketId(
    findByTicket: FindByTicket
  ): Promise<Array<ProductSaleEntity>> {
    const products = await findByTicketAction(findByTicket);

    if (!products || !products.data) {
      throw new NotFoundException();
    }

    return ProductsSaleMapper.summaryToDomain(products.data);
  }
}

export default ProductsSaleRepositoryImpl;

import { CommonResponse } from "@/core/common/models/types";
import ProductSaleEntity from "../../domain/entities/product-sale.entity";
import { FindByTicket } from "../../domain/interfaces/find-by-ticket";
import { ProductsSaleRepository } from "../../domain/repositories/products-sale.repository";
import { findByTicketAction } from "../actions/find-by-ticket.action";
import ProductsSaleMapper from "../mappers/products-sale.mapper";
import { NotFoundException } from "@/core/common/lib/errors/exeptions-handler";
import findByIdAction from "../actions/find-by-id.action";

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
  ): Promise<CommonResponse<Array<ProductSaleEntity> | null>> {
    const products = await findByTicketAction(findByTicket);

    if (!products || !products.data) {
      return NotFoundException.exeption(products.error);
    }

    return {
      statusCode: products.statusCode,
      data: ProductsSaleMapper.summaryToDomain(products.data),
    };
  }

  async findById(
    id: number
  ): Promise<CommonResponse<ProductSaleEntity | null>> {
    const product = await findByIdAction(id);

    if (!product.data) {
      return NotFoundException.exeption(product.error);
    }

    return {
      statusCode: product.statusCode,
      data: ProductsSaleMapper.prismaToDomain(product.data),
    };
  }
}

export default ProductsSaleRepositoryImpl;

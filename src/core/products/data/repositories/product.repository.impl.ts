import { CommonResponse, Filters } from "@Core/common/models/types";

import ProductMapper from "../mappers/product.mapper";
import findProductAction from "../actions/find-product.action";
import editProductAction from "../actions/edit-product.action";
import ProductEntity from "../../domain/entities/product.entity";
import findProductsAction from "../actions/find-products.action";
import createProductAction from "../actions/create-product.action";
import { countProductsAction } from "../actions/count-products.action";
import ProductRepository from "../../domain/repositories/product.repository";
import deleteProductAction from "../actions/delete-poduct.action";

class ProductRepositoryImpl implements ProductRepository {
  private static instance: ProductRepositoryImpl;

  private constructor() {}

  public static getInstance(): ProductRepositoryImpl {
    if (!this.instance) {
      this.instance = new ProductRepositoryImpl();
    }
    return this.instance;
  }

  async countProducts(query?: string): Promise<CommonResponse<number | null>> {
    return await countProductsAction(query);
  }

  async findManyProducts(
    offSet: number,
    page: number,
    filters: Filters
  ): Promise<CommonResponse<ProductEntity[] | null>> {
    return await findProductsAction({
      page,
      offset: offSet,
      filters,
    });
  }

  async createProduct(
    product: ProductEntity
  ): Promise<CommonResponse<ProductEntity | null>> {
    return await createProductAction(ProductMapper.domainToCreateDto(product));
  }

  async findByBarcode(
    barcode: string
  ): Promise<CommonResponse<ProductEntity | null>> {
    return await findProductAction(barcode);
  }

  async editProduct(
    product: ProductEntity
  ): Promise<CommonResponse<ProductEntity | null>> {
    return await editProductAction(ProductMapper.domainToEditDto(product));
  }

  async deleteProduct(
    id: number
  ): Promise<CommonResponse<ProductEntity | null>> {
    return await deleteProductAction(id);
  }
}

export default ProductRepositoryImpl;

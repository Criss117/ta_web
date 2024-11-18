import { CommonResponse, Filters } from "@Core/common/models/types";

import ProductMapper from "../mappers/product.mapper";
import ProductEntity from "../../domain/entities/product.entity";
import ProductRepository from "../../domain/repositories/product.repository";
import findProductAction from "../actions/find-product.action";
import editProductAction from "../actions/edit-product.action";
import findProductsAction from "../actions/find-products.action";
import createProductAction from "../actions/create-product.action";
import countProductsAction from "../actions/count-products.action";
import deleteProductAction from "../actions/delete-poduct.action";

class ProductRepositoryImpl implements ProductRepository {
  private static instance: ProductRepository;

  private constructor() {}

  public static getInstance(): ProductRepository {
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
    return await findProductAction({ barcode });
  }

  async editProduct(
    product: ProductEntity
  ): Promise<CommonResponse<ProductEntity | null>> {
    return await editProductAction(ProductMapper.domainToEditDto(product));
  }

  async deleteProduct(
    id: string
  ): Promise<CommonResponse<ProductEntity | null>> {
    return await deleteProductAction(id);
  }

  async findById(id: string): Promise<CommonResponse<ProductEntity | null>> {
    return await findProductAction({ id });
  }
}

export default ProductRepositoryImpl;

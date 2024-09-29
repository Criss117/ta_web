import { Filters } from "@Core/common/models/types";

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

  async countProducts(query?: string): Promise<number> {
    const productsCount = await countProductsAction(query);

    return productsCount.data || 0;
  }

  async findManyProducts(
    offSet: number,
    page: number,
    filters: Filters
  ): Promise<ProductEntity[]> {
    const products = await findProductsAction({
      page,
      offset: offSet,
      filters,
    });

    if (!products.data) return [];

    return products.data;
  }

  async createProduct(product: ProductEntity): Promise<ProductEntity | null> {
    const newProduct = await createProductAction(
      ProductMapper.domainToCreateDto(product)
    );

    if (!newProduct.data) return null;

    return newProduct.data;
  }

  async findByBarcode(barcode: string): Promise<ProductEntity> {
    const product = await findProductAction(barcode);

    if (!product.data) {
      throw new Error("Product not found");
    }

    return product.data;
  }

  async editProduct(product: ProductEntity): Promise<ProductEntity | null> {
    const updatedProduct = await editProductAction(
      ProductMapper.domainToEditDto(product)
    );

    if (!updatedProduct.data) return null;

    return updatedProduct.data;
  }

  async deleteProduct(id: number): Promise<ProductEntity | null> {
    const deletedProduct = await deleteProductAction(id);

    if (!deletedProduct.data) return null;

    return deletedProduct.data;
  }
}

export default ProductRepositoryImpl;

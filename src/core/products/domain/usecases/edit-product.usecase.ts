import { CommonResponse } from "@/core/common/models/types";
import ProductEntity from "../entities/product.entity";
import ProductRepository from "../repositories/product.repository";

class EditProductUseCase {
  private static instance: EditProductUseCase;

  private constructor(private readonly productRepository: ProductRepository) {}

  public static getInstance(
    productRepository: ProductRepository
  ): EditProductUseCase {
    if (!this.instance) {
      this.instance = new EditProductUseCase(productRepository);
    }
    return this.instance;
  }

  public async execute(
    product: ProductEntity
  ): Promise<CommonResponse<ProductEntity | null>> {
    return await this.productRepository.editProduct(product);
  }
}

export default EditProductUseCase;

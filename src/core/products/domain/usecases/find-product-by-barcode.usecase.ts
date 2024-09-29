import ProductRepository from "../repositories/product.repository";
import ProductEntity from "../entities/product.entity";
import { CommonResponse } from "@/core/common/models/types";

class FindProductByBarCodeUseCase {
  private static instance: FindProductByBarCodeUseCase;

  private constructor(private readonly productRepository: ProductRepository) {}

  public static getInstance(
    productRepository: ProductRepository
  ): FindProductByBarCodeUseCase {
    if (!this.instance) {
      this.instance = new FindProductByBarCodeUseCase(productRepository);
    }
    return this.instance;
  }

  public async execute(
    barcode: string
  ): Promise<CommonResponse<ProductEntity | null>> {
    return await this.productRepository.findByBarcode(barcode);
  }
}

export default FindProductByBarCodeUseCase;

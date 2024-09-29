import ProductRepository from "../repositories/product.repository";
import ProductEntity from "../entities/product.entity";

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

  public async execute(barcode: string): Promise<ProductEntity> {
    return await this.productRepository.findByBarcode(barcode);
  }
}

export default FindProductByBarCodeUseCase;

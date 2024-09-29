import ProductEntity from "../entities/product.entity";
import ProductRepository from "../repositories/product.repository";

class CreateProductUseCase {
  private static instance: CreateProductUseCase;
  private constructor(private readonly productRepository: ProductRepository) {}

  public static getInstance(
    productRepository: ProductRepository
  ): CreateProductUseCase {
    if (!this.instance) {
      this.instance = new CreateProductUseCase(productRepository);
    }
    return this.instance;
  }

  public async execute(product: ProductEntity): Promise<ProductEntity | null> {
    return await this.productRepository.createProduct(product);
  }
}

export default CreateProductUseCase;

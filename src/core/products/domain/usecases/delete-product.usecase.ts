import ProductEntity from "../entities/product.entity";
import ProductRepository from "../repositories/product.repository";

class DeleteProductUseCase {
  private static instance: DeleteProductUseCase;
  private constructor(private readonly productRepository: ProductRepository) {}

  public static getInstance(
    productRepository: ProductRepository
  ): DeleteProductUseCase {
    if (!this.instance) {
      this.instance = new DeleteProductUseCase(productRepository);
    }
    return this.instance;
  }

  public async execute(id: number): Promise<ProductEntity | null> {
    return await this.productRepository.deleteProduct(id);
  }
}

export default DeleteProductUseCase;

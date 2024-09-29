import ProductRepositoryImpl from "../data/repositories/product.repository.impl";
import CreateProductUseCase from "../domain/usecases/create-product.usecase";
import DeleteProductUseCase from "../domain/usecases/delete-product.usecase";
import EditProductUseCase from "../domain/usecases/edit-product.usecase";
import FindProductByBarCodeUseCase from "../domain/usecases/find-product-by-barcode.usecase";
import FindProductsUseCase from "../domain/usecases/find-products.usecase";

class ProductsUseCasesfactory {
  private static productRepository = ProductRepositoryImpl.getInstance();

  static createFindManyUseCase() {
    return FindProductsUseCase.getInstance(this.productRepository);
  }

  static createCreateProduct() {
    return CreateProductUseCase.getInstance(this.productRepository);
  }

  static createFindProduct() {
    return FindProductByBarCodeUseCase.getInstance(this.productRepository);
  }

  static createEditProduct() {
    return EditProductUseCase.getInstance(this.productRepository);
  }

  static createDeleteProduct() {
    return DeleteProductUseCase.getInstance(this.productRepository);
  }
}

export default ProductsUseCasesfactory;

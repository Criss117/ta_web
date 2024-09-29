import { Filters } from "../../../common/models/types";
import ProductEntity from "../entities/product.entity";
interface ProductRepository {
  countProducts: (query?: string) => Promise<number>;
  findManyProducts(
    offSet: number,
    page: number,
    filters?: Filters
  ): Promise<ProductEntity[]>;

  createProduct: (product: ProductEntity) => Promise<ProductEntity | null>;

  findByBarcode: (barcode: string) => Promise<ProductEntity>;

  editProduct: (product: ProductEntity) => Promise<ProductEntity | null>;

  deleteProduct: (id: number) => Promise<ProductEntity | null>;
}

export default ProductRepository;

import { Filters, CommonResponse } from "../../../common/models/types";
import ProductEntity from "../entities/product.entity";
interface ProductRepository {
  countProducts: (query?: string) => Promise<CommonResponse<number | null>>;
  findManyProducts(
    offSet: number,
    page: number,
    filters?: Filters
  ): Promise<CommonResponse<ProductEntity[] | null>>;

  createProduct: (
    product: ProductEntity
  ) => Promise<CommonResponse<ProductEntity | null>>;

  findByBarcode: (
    barcode: string
  ) => Promise<CommonResponse<ProductEntity | null>>;

  findById: (id: string) => Promise<CommonResponse<ProductEntity | null>>;

  editProduct: (
    product: ProductEntity
  ) => Promise<CommonResponse<ProductEntity | null>>;

  deleteProduct: (id: string) => Promise<CommonResponse<ProductEntity | null>>;
}

export default ProductRepository;

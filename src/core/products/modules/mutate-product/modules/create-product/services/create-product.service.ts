import type {
  MutateProductReturnType,
  ProductForm,
} from "../../../models/types";
import { createProduct } from "../actions/create-product.action";

export class CreateProductService {
  private product: ProductForm;
  constructor(product: ProductForm) {
    this.product = product;
  }

  async execute(): Promise<MutateProductReturnType> {
    return await createProduct(this.product);
  }
}

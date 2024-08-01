import { createProduct } from "../actions/create-product.action";
import { MutateProductReturnType, ProductForm } from "../models/types";

export class CreateProduct {
  private product: ProductForm;
  constructor(product: ProductForm) {
    this.product = product;
  }

  async execute(): Promise<MutateProductReturnType> {
    return await createProduct(this.product);
  }
}

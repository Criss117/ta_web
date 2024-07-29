import { createProduct } from "../actions/create-product.action";
import { CreateProductInputType } from "../models/types";

export class CreateProduct {
  private product: CreateProductInputType;
  constructor(product: CreateProductInputType) {
    this.product = product;
  }

  async execute() {
    return await createProduct(this.product);
  }
}

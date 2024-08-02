import { findOneProduct } from "../actions/find-one-product.action";
import { MutateProductReturnType } from "../models/types";

export class FindOneProductService {
  private barcode: string;
  constructor(barcode: string) {
    this.barcode = barcode;
  }

  async execute(): Promise<MutateProductReturnType> {
    const product = await findOneProduct(this.barcode);
    return product;
  }
}

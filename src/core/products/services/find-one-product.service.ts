import { findOneProduct } from "../actions/find-one-product.action";

export class FindOneProductService {
  private barcode: string;
  constructor(barcode: string) {
    this.barcode = barcode;
  }

  async execute() {
    const product = await findOneProduct(this.barcode);
    return product;
  }
}

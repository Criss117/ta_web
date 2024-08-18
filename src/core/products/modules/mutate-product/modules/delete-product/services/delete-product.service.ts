import { MutateProductReturnType } from "../../../models/types";
import { deleteProduct } from "../actions/delete-product.action";

export class DeleteProductService {
  private barcode: string;
  private id: number;

  constructor(barcode: string, id: number) {
    this.barcode = barcode;
    this.id = id;
  }

  async execute(): Promise<MutateProductReturnType> {
    return deleteProduct(this.barcode, this.id);
  }
}

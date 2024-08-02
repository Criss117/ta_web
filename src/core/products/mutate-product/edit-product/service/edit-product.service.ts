import {
  EditProductInputType,
  MutateProductReturnType,
} from "../../models/types";
import { editProduct } from "../actions/edit-product.action";

export class EditProductService {
  private product: EditProductInputType;

  constructor(product: EditProductInputType) {
    this.product = product;
  }

  async execute(): Promise<MutateProductReturnType> {
    return await editProduct(this.product);
  }
}

import { countProducts } from "../actions/find-products.action";

export class CountProductsService {
  static async countProducts() {
    return await countProducts();
  }
  static async countToPagination(offset: number) {
    const total = await countProducts();

    return { totalProducts: total, totalPage: Math.ceil(total / offset) };
  }
}

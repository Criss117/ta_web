import { countProducts } from "../actions/find-products.action";

export class CountProductsService {
  static async countProducts() {
    return await countProducts();
  }
  static async countToPagination(offset: number, query?: string) {
    const total = await countProducts(query);

    return { totalProducts: total, totalPage: Math.ceil(total / offset) };
  }
}

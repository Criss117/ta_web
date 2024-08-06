import { countProducts } from "../actions/find-products.action";

export class CountProductsService {
  static async countProducts() {
    return await countProducts();
  }
  static async countToPagination(offset: number, query?: string) {
    const res = await countProducts(query);

    const total = res.data;

    if (!total) return { totalProducts: 0, totalPage: 0 };

    return { totalProducts: total, totalPage: Math.ceil(total / offset) };
  }
}

import type { CreateProductSale, ProductSale } from "../models/types";

export class ProductsSaleToCreateAdapter {
  static adapt(ticketId: number, products: ProductSale[]): CreateProductSale[] {
    return products.map((product) => {
      return {
        ticketId: ticketId,
        productId: product.productId,
        salePrice: product.salePrice,
        quantity: product.quantity,
        subTotal: product.subTotal,
      };
    });
  }
}

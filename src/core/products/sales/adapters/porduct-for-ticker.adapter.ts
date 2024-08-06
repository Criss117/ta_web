import { Product } from "@prisma/client";
import { ProductTicket } from "../models/type";

export class ProductForTickerAdapter {
  public static adapt(product: Product): ProductTicket {
    return {
      id: product.id,
      barcode: product.barcode,
      description: product.description,
      salePrice: product.salePrice,
      quantity: 1,
      subTotal: product.salePrice,
      stock: product.stock,
      originalPrice: product.salePrice,
      wholesalePrice: product.wholesalePrice,
      currentStock: product.stock,
    };
  }
}

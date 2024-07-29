import { Product } from "@prisma/client";
import { ProductTicket } from "../models/type";

export class ProductToTicketProduct {
  static adapt(product: Product): ProductTicket {
    return {
      ...product,
      quantity: 1,
      subtotal: product.salePrice,
      originalPrice: product.salePrice,
    };
  }
}

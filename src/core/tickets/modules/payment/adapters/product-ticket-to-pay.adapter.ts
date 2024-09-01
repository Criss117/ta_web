import { Ticket } from "../../../models/type";
import type { ProductSale } from "../models/types";

export class ProductTicketToPayAdapter {
  static adapt(ticket: Ticket | null): ProductSale[] {
    if (!ticket) return [];

    return ticket.products.map((product) => {
      return {
        productId: product.id,
        salePrice: product.salePrice,
        quantity: product.quantity,
        subTotal: product.subTotal,
      };
    });
  }
}

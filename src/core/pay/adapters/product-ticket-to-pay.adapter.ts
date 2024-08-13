import type { Ticket } from "@/core/products/sales/models/type";
import type { ProductPay } from "../models/types";

export class ProductTicketToPayAdapter {
  static adapt(ticket: Ticket | null): ProductPay[] {
    if (!ticket) return [];

    return ticket.products.map((product) => {
      return {
        id: product.id,
        barcode: product.barcode,
        salePrice: product.salePrice,
        quantity: product.quantity,
        subTotal: product.subTotal,
      };
    });
  }
}

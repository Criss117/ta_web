import { Product } from "@prisma/client";

export interface ProductTicket extends Product {
  originalPrice: number;
  quantity: number;
  subtotal: number;
}

export interface Ticket {
  id: number;
  ticketName: string;
  total: number;
  products: ProductTicket[];
}

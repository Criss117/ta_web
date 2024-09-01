import { z } from "zod";

export const ProductTicketSchema = z.object({
  id: z.number(),
  barcode: z.string(),
  description: z.string(),
  originalPrice: z.number(),
  salePrice: z.number(),
  wholesalePrice: z.number(),
  quantity: z.number(),
  subTotal: z.number(),
  stock: z.number(),
  currentStock: z.number(),
});

export const TicketSchema = z.object({
  id: z.number(),
  label: z.string(),
  products: z.array(ProductTicketSchema),
});

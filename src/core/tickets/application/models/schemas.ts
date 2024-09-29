import { z } from "zod";

export const ProductTicketSchema = z.object({
  id: z.number(),
  barcode: z.string(),
  productId: z.number(),
  description: z.string(),
  originalSalePrice: z.number(),
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
  total: z.number().min(0),
  clientId: z.number().optional(),
  ccNumber: z.string().optional(),
  productsTickets: z.array(ProductTicketSchema),
});

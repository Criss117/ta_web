import { z } from "zod";

export const ProductSaleSchema = z.object({
  productId: z.number(),
  salePrice: z.number(),
  quantity: z.number(),
  subTotal: z.number(),
});

export const TicketStateSchema = z.enum(["PENDING", "PAID"]);

export const TicketSchema = z.object({
  total: z.number().min(0),
  state: TicketStateSchema,
});

export const TicketToPaySchema = TicketSchema.extend({
  products: z.array(ProductSaleSchema),
});

export const CreateProductSaleSchema = ProductSaleSchema.extend({
  ticketId: z.number(),
});

export const DecremetentStockSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
});

export const UpdateClientPaySchema = z.object({
  id: z.number(),
  ccNumber: z.string(),
  total: z.number(),
});

export const VerifyStockSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
});

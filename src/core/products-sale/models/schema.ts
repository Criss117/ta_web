import { z } from "zod";

export const FindProductsSaleSchema = z.object({
  ticketId: z.number(),
});

export const ProductSaleSchema = z.object({
  id: z.number(),
  salePrice: z.number(),
  quantity: z.number(),
  subTotal: z.number(),
  description: z.string(),
});

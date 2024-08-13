import { z } from "zod";

export const ProductPaySchema = z.object({
  id: z.number(),
  barcode: z.string(),
  salePrice: z.number(),
  quantity: z.number(),
  subTotal: z.number(),
});

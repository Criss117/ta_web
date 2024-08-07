import { z } from "zod";

export const ProductSearchSchema = z.object({
  barcode: z.string().min(1),
});

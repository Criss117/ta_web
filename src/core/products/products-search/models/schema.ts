import { z } from "zod";

export const ProductSearchSchema = z.object({
  query: z.string().min(1),
});

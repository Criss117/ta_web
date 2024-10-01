import { z } from "zod";
import { EditProductFormSchema, ProductFormSchema } from "./schemas";

export type ProductFormDto = z.infer<typeof ProductFormSchema> & {
  id?: string;
};

export type EditProductDto = z.infer<typeof EditProductFormSchema>;

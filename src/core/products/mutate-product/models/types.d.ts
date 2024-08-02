import { z } from "zod";
import { Product } from "@prisma/client";

import { EditProductFormSchema, ProductFormSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type CreateProductInputType = z.infer<typeof ProductFormSchema>;
export type EditProductInputType = z.infer<typeof EditProductFormSchema>;

export type MutateProductReturnType = ActionState<ProductForm, Product>;

export type ProductForm = z.infer<typeof ProductFormSchema> & {
  id?: number;
};

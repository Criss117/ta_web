import { z } from "zod";
import { Product } from "@prisma/client";

import { EditProductFormSchema, ProductFormSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
Omit;

export type CreateProductInputType = z.infer<typeof ProductFormSchema>;
export type UpdateProductInputType = z.infer<typeof EditProductFormSchema>;

export type MutateProductReturnType = ActionState<ProductForm, Product>;

export type ProductForm = CreateProductInputType & {
  id?: number;
};

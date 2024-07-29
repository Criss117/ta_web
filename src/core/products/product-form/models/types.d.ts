import { z } from "zod";
import { Product } from "@prisma/client";

import { ProductFormSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
Omit;

export type CreateProductInputType = z.infer<typeof ProductFormSchema>;
export type CreateProductReturnType = ActionState<
  CreateProductInputType,
  Product
>;

export type ProductForm = CreateProductInputType & {
  id?: number;
};

import { z } from "zod";
import { FindProductsSaleSchema, ProductSaleSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type ProductSaleClient = z.infer<typeof ProductSaleSchema>;
export type FindProdcutsSalesInputType = z.infer<typeof FindProductsSaleSchema>;

export type FindProdcutsSalesReturnType = ActionState<
  FindProdcutsSalesInputType,
  Array<ProductSaleClient>
>;

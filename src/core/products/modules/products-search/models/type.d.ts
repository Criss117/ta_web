import { z } from "zod";
import { ProductSearchSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Product } from "@prisma/client";

export type ProductSearchInputType = z.infer<typeof ProductSearchSchema>;

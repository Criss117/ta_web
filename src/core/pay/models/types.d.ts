import { z } from "zod";
import { ProductPaySchema } from "./schema";

export type ProductPay = z.infer<typeof ProductPaySchema>;

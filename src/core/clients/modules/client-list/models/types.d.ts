import { z } from "zod";
import { ClientPaySchema } from "./schema";

export type ClientPay = z.infer<typeof ClientPaySchema>;

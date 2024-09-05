import { z } from "zod";

export const CreateDebtPaymentSchema = z.object({
  clientId: z.number(),
  amount: z
    .string()
    .min(0)
    .refine((val) => !isNaN(parseInt(val))),
});

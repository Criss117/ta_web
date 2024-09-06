import { z } from "zod";

export const CreateDebtPaymentSchema = z.object({
  clientId: z.number().positive(),
  amount: z
    .string()
    .min(0)
    .refine((val) => !isNaN(parseInt(val))),
});

export const FindDPByClientIdSchema = z.object({
  clientId: z.number().positive(),
});

export const DeleteDebtPaymentSchema = z.object({
  id: z.number().positive(),
  clientId: z.number().positive(),
});

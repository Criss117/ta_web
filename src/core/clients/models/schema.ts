import { z } from "zod";

export const FindOneClientSchema = z.object({
  ccNumber: z.string(),
  obtaintTickets: z.boolean().optional(),
});

export const SettleDebtSchema = z.object({
  clientId: z.number(),
});

import { z } from "zod";

export const FindClientPaysSchema = z.object({
  query: z.string().optional(),
  offset: z.number().optional(),
});

export const ClientPaySchema = z.object({
  id: z.number(),
  ccNumber: z.string(),
  fullName: z.string(),
});

import { z } from "zod";

export const FiltersSchema = z.object({
  minStock: z.boolean().optional(),
  query: z.string().optional(),
});

export const FindEntitiesSchema = z.object({
  query: z.string().optional(),
  offset: z.number().optional(),
  page: z.number().optional(),
  filters: FiltersSchema.optional(),
});

export const CountEnititesParamas = z.object({
  query: z.string().optional(),
  offset: z.number().optional(),
});

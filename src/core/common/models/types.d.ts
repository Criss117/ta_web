import { z } from "zod";
import {
  CountEnititesParamas,
  FiltersSchema,
  FindEntitiesSchema,
} from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type Filters = z.infer<typeof FiltersSchema>;
export type FindEntitesInputType = z.infer<typeof FindEntitiesSchema>;
export type CountEntitiesInputType = z.infer<typeof CountEnititesParamas>;

export type FindEntitiesReturnType<T> = ActionState<FindEntitesInputType, T>;

export type StatusType<T> = {
  isError: boolean;
  isLoading: boolean;
  response?: T;
};

import { Filters } from "./types";

export interface FindEntitiesParams {
  offset: number;
  page: number;
  filters?: Filters;
}

export interface CountEnititesParamas {
  offset: number;
  query?: string;
}

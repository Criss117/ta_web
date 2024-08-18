import { Filters } from "./types";

export interface FindEntitiesParams {
  offset: number;
  page: number;
  filters?: Filters;
}

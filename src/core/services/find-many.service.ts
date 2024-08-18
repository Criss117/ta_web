import type { Filters } from "@/core/models/types";
import type { FindEntitiesParams } from "../models/interfaces";

export abstract class FindManyEntitiesService {
  protected offset: number = 10;
  protected page: number = 0;
  protected filters?: Filters;

  constructor(page = 0, offset: number, filters?: Filters) {
    this.offset = offset || 10;
    this.page = page;
    this.filters = filters;
  }

  protected abstract findEntities(params: FindEntitiesParams): Promise<any>;

  async execute() {
    return await this.findEntities({
      offset: this.offset,
      page: this.page,
      filters: this.filters,
    });
  }
}

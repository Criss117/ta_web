import { findProducts } from "../actions/find-products.action";
import type { Filters } from "../models/types";

export class FindProductsService {
  private offSet: number = 10;
  private page: number = 0;
  private filters?: Filters;

  constructor(page = 0, offset: number, filters?: Filters) {
    this.offSet = offset || 10;
    this.page = page;
    this.filters = filters;
  }

  async execute() {
    return await findProducts({
      offSet: this.offSet,
      page: this.page,
      filters: this.filters,
    });
  }
}

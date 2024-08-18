import { findProducts } from "../actions/find-products.action";
import { FindManyEntitiesService } from "@/core/services/find-many.service";
import type { FindEntitiesParams } from "@/core/models/interfaces";

export class FindProductsService extends FindManyEntitiesService {
  protected findEntities(params: FindEntitiesParams): Promise<any> {
    return findProducts(params);
  }
}

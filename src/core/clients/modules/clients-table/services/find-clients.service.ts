import { findClients } from "../actions/find-clients.action";
import { FindManyEntitiesService } from "@/core/services/find-many.service";
import type { FindEntitiesParams } from "@/core/models/interfaces";

export class FindClientsService extends FindManyEntitiesService {
  protected findEntities(params: FindEntitiesParams): Promise<any> {
    return findClients(params);
  }
}

import { Filters } from "@/core/common/models/types";
import ClientSummaryEntity from "../entitites/client-summary.entity";
import { Pagination } from "../models/pagination";
import type { ClientFormType, MutateClientReturnType } from "../models/type";

export interface ClientRepository {
  getClients: (
    offSet: number,
    page: number,
    filters?: Filters
  ) => Promise<Pagination<ClientSummaryEntity>>;

  createClient: (newClient: ClientFormType) => Promise<MutateClientReturnType>;
}

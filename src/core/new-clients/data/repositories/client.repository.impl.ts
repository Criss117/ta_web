import { Filters } from "@/core/common/models/types";
import { ClientRepository } from "../../domain/repositories/clients.repository";
import { findClientsAction } from "../actions/find-clients.action";
import ClientMapper from "../mappers/client.mapper";
import { Pagination } from "../../domain/models/pagination";
import ClientSummaryEntity from "../../domain/entitites/client-summary.entity";
import { countClientsAction } from "../actions/count-clients.action";

class ClientRepositoryImlp implements ClientRepository {
  private static instance: ClientRepositoryImlp;
  private constructor() {}

  static getInstance(): ClientRepositoryImlp {
    if (!ClientRepositoryImlp.instance) {
      ClientRepositoryImlp.instance = new ClientRepositoryImlp();
    }
    return ClientRepositoryImlp.instance;
  }

  async getClients(
    offset: number,
    page: number,
    filters?: Filters
  ): Promise<Pagination<ClientSummaryEntity>> {
    const clientsFind = await findClientsAction({
      offset,
      page,
      filters,
    });

    const countRes = await countClientsAction({
      query: filters?.query,
      offset,
    });

    if (!clientsFind.data || !countRes.data) {
      return {
        items: [],
        total: 0,
        offset: 0,
        page: 1,
        totalPage: 1,
      };
    }

    return ClientMapper.summaryToDomain(clientsFind.data, {
      ...countRes.data,
      page,
      offset,
    });
  }
}

export default ClientRepositoryImlp;

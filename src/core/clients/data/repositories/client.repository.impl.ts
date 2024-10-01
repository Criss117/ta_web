import { Filters } from "@Core/common/models/types";

import ClientMapper from "../mappers/client.mapper";
import settleDebtAction from "../actions/settle-debt.action";
import ClientEntity from "../../domain/entitites/client.entity";
import { editClientAction } from "../actions/edit-client.action";
import { findByIdOrCcNumber } from "../actions/find-client.action";
import { findClientsAction } from "../actions/find-clients.action";
import { countClientsAction } from "../actions/count-clients.action";
import { createClientAction } from "../actions/create-client.action";
import { deleteClientAction } from "../actions/delete-client.action";
import { ClientRepository } from "../../domain/repositories/clients.repository";
import { FindByIdOrCcNumber } from "../../domain/interfaces/find-by-id-or-ccnumber";
import { CommonResponse } from "../../../common/models/types";
import { NotFoundException } from "@/core/common/lib/errors/exeptions-handler";

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
  ): Promise<CommonResponse<ClientEntity[] | null>> {
    const clientsFind = await findClientsAction({
      offset,
      page,
      filters,
    });

    if (!clientsFind.data) {
      return NotFoundException.exeption(clientsFind.error);
    }

    return {
      statusCode: clientsFind.statusCode,
      data: clientsFind.data.map((c) => {
        return {
          ...c,
          tickets: null,
        };
      }),
    };
  }

  async countClients(query?: string): Promise<CommonResponse<number>> {
    const clientsCount = await countClientsAction(query);
    return {
      statusCode: clientsCount.statusCode,
      data: clientsCount.data || 0,
    };
  }

  async createClient(
    newClient: ClientEntity
  ): Promise<CommonResponse<ClientEntity | null>> {
    return await createClientAction({
      ccNumber: newClient.ccNumber,
      fullName: newClient.fullName,
      address: newClient.address,
      phone: newClient.phone,
      creditLimit: newClient.creditLimit,
    });
  }

  async deleteClient(
    id: string,
    ccNumber: string
  ): Promise<CommonResponse<ClientEntity | null>> {
    return await deleteClientAction({ ccNumber, id });
  }

  async findByIdOrCcNumber(
    findBy: FindByIdOrCcNumber
  ): Promise<CommonResponse<ClientEntity | null>> {
    return await findByIdOrCcNumber(findBy);
  }

  async editClient(
    client: ClientEntity
  ): Promise<CommonResponse<ClientEntity | null>> {
    const clientEdited = await editClientAction(
      ClientMapper.domainToEditClientDto(client)
    );

    if (!clientEdited.data) {
      return NotFoundException.exeption(clientEdited.error);
    }

    return {
      statusCode: clientEdited.statusCode,
      data: { ...clientEdited.data, tickets: null },
    };
  }

  async settleDebt(
    clientId: string
  ): Promise<CommonResponse<ClientEntity | null>> {
    const res = await settleDebtAction(clientId);

    if (!res.data) {
      return NotFoundException.exeption(res.error);
    }

    return {
      statusCode: res.statusCode,
      data: { ...res.data, tickets: null },
    };
  }
}

export default ClientRepositoryImlp;

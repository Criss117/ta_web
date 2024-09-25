import { Filters } from "@Core/common/models/types";
import { NotFoundException } from "@Core/common/errors/expetions";

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
  ): Promise<ClientEntity[]> {
    const clientsFind = await findClientsAction({
      offset,
      page,
      filters,
    });

    if (!clientsFind.data) {
      return [];
    }

    return clientsFind.data.map((c) => {
      return {
        ...c,
        tickets: null,
      };
    });
  }

  async countClients(query?: string): Promise<number> {
    const clientsCount = await countClientsAction(query);
    return clientsCount.data || 0;
  }

  async createClient(newClient: ClientEntity): Promise<ClientEntity | null> {
    const createdClient = await createClientAction({
      ccNumber: newClient.ccNumber,
      fullName: newClient.fullName,
      address: newClient.address,
      phone: newClient.phone,
      creditLimit: newClient.creditLimit,
    });
    return createdClient.data || null;
  }

  async deleteClient(
    id: number,
    ccNumber: string
  ): Promise<ClientEntity | null> {
    const deletedClient = await deleteClientAction({ ccNumber, id });

    return deletedClient.data || null;
  }

  async findByIdOrCcNumber(findBy: FindByIdOrCcNumber): Promise<ClientEntity> {
    const client = await findByIdOrCcNumber(findBy);

    if (!client.data) {
      throw new NotFoundException();
    }

    return client.data;
  }

  async editClient(client: ClientEntity): Promise<ClientEntity> {
    const clientEdited = await editClientAction(
      ClientMapper.domainToEditClientDto(client)
    );

    if (!clientEdited.data) {
      throw new NotFoundException();
    }

    return {
      ...clientEdited.data,
      tickets: null,
    };
  }

  async settleDebt(clientId: number): Promise<ClientEntity> {
    const res = await settleDebtAction(clientId);

    if (!res.data) {
      throw new NotFoundException();
    }

    return res.data;
  }
}

export default ClientRepositoryImlp;

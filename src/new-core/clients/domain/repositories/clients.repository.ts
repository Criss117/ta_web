import { Filters } from "@Core/common/models/types";
import ClientEntity from "../entitites/client.entity";
import { FindByIdOrCcNumber } from "../interfaces/find-by-id-or-ccnumber";

export interface ClientRepository {
  countClients: (query?: string) => Promise<number>;

  getClients: (
    offSet: number,
    page: number,
    filters?: Filters
  ) => Promise<ClientEntity[]>;

  createClient: (newClient: ClientEntity) => Promise<ClientEntity | null>;

  deleteClient: (id: number, ccNumber: string) => Promise<ClientEntity | null>;

  findByIdOrCcNumber: (findBy: FindByIdOrCcNumber) => Promise<ClientEntity>;

  editClient(client: ClientEntity): Promise<ClientEntity>;

  settleDebt: (clientId: number) => Promise<ClientEntity>;
}

import { Filters } from "@Core/common/models/types";
import ClientEntity from "../entitites/client.entity";
import { FindByIdOrCcNumber } from "../interfaces/find-by-id-or-ccnumber";
import { CommonResponse } from "../../../common/models/types";

export interface ClientRepository {
  countClients: (query?: string) => Promise<CommonResponse<number>>;

  getClients: (
    offSet: number,
    page: number,
    filters?: Filters
  ) => Promise<CommonResponse<ClientEntity[] | []>>;

  createClient: (
    newClient: ClientEntity
  ) => Promise<CommonResponse<ClientEntity | null>>;

  deleteClient: (
    id: number,
    ccNumber: string
  ) => Promise<CommonResponse<ClientEntity | null>>;

  findByIdOrCcNumber: (
    findBy: FindByIdOrCcNumber
  ) => Promise<CommonResponse<ClientEntity | null>>;

  editClient(
    client: ClientEntity
  ): Promise<CommonResponse<ClientEntity | null>>;

  settleDebt: (
    clientId: number
  ) => Promise<CommonResponse<ClientEntity | null>>;
}

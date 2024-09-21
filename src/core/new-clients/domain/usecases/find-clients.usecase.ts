import { Filters } from "@/core/common/models/types";
import { ClientRepository } from "../repositories/clients.repository";
export class FindClientsUseCase {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(offSet: number, page: number, filters?: Filters) {
    console.log({ page });
    return await this.clientRepository.getClients(offSet, page, filters);
  }
}

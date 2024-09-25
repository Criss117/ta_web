import { Filters } from "@/core/common/models/types";
import { ClientRepository } from "../../domain/repositories/clients.repository";
import { BadRequestException } from "@/new-core/common/errors/expetions";
import { PaginationDto } from "@Core/common/dto/pagination.dto";
import ClientEntity from "../entitites/client.entity";

class FindClientsUseCase {
  private static instance: FindClientsUseCase;

  private constructor(private readonly clientRepository: ClientRepository) {}

  static getInstance(clientRepository: ClientRepository): FindClientsUseCase {
    if (!FindClientsUseCase.instance) {
      FindClientsUseCase.instance = new FindClientsUseCase(clientRepository);
    }
    return FindClientsUseCase.instance;
  }

  async execute(
    offSet: number,
    page: number,
    filters?: Filters
  ): Promise<PaginationDto<ClientEntity>> {
    const clients = await this.clientRepository.getClients(
      offSet,
      page,
      filters
    );
    const totalItems = await this.clientRepository.countClients(filters?.query);

    if (totalItems === 0) {
      throw new BadRequestException("No clients found");
    }

    const totalPage = Math.ceil(totalItems / offSet);

    return {
      items: clients,
      total: totalItems,
      offset: offSet,
      page,
      totalPage,
    };
  }
}

export default FindClientsUseCase;

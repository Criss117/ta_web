import { ClientRepository } from "../../domain/repositories/clients.repository";
import { CommonResponse, Filters } from "@Core/common/models/types";
import { BadRequestException } from "@/core/common/lib/errors/exeptions-handler";
import HttpStatusCodes from "@/core/common/lib/http-status-code";

class FindClientsUseCase {
  private static instance: FindClientsUseCase;

  private constructor(private readonly clientRepository: ClientRepository) {}

  static getInstance(clientRepository: ClientRepository): FindClientsUseCase {
    if (!this.instance) {
      this.instance = new FindClientsUseCase(clientRepository);
    }
    return this.instance;
  }

  async execute(offSet: number, page: number, filters?: Filters) {
    const clients = await this.clientRepository.getClients(
      offSet,
      page,
      filters
    );
    const totalItems = await this.clientRepository.countClients(filters?.query);

    if (!clients.data || !totalItems.data || totalItems.data === 0) {
      return BadRequestException.exeption("No clients found");
    }

    const totalPage = Math.ceil(totalItems.data / offSet);

    return {
      statusCode: HttpStatusCodes.OK.code,
      data: {
        items: clients.data,
        total: totalItems.data,
        offset: offSet,
        page,
        totalPage,
      },
    };
  }
}

export default FindClientsUseCase;

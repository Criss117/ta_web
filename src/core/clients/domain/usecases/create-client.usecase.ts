import ClientEntity from "../entitites/client.entity";
import { ClientRepository } from "../repositories/clients.repository";

class CreateClientUseCase {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(newClient: ClientEntity) {
    return this.clientRepository.createClient(newClient);
  }
}

export default CreateClientUseCase;

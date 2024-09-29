import ClientEntity from "../entitites/client.entity";
import { ClientRepository } from "../repositories/clients.repository";

class EditClientUseCase {
  private static instance: EditClientUseCase;

  private constructor(private readonly clientRepository: ClientRepository) {}

  static getInstance(clientRepository: ClientRepository) {
    if (!this.instance) {
      this.instance = new EditClientUseCase(clientRepository);
    }
    return this.instance;
  }

  async execute(client: ClientEntity) {
    return this.clientRepository.editClient(client);
  }
}

export default EditClientUseCase;

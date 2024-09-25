import ClientEntity from "../entitites/client.entity";
import { ClientRepository } from "../repositories/clients.repository";

class EditClientUseCase {
  private static instance: EditClientUseCase;

  private constructor(private readonly clientRepository: ClientRepository) {}

  static getInstance(clientRepository: ClientRepository) {
    if (!EditClientUseCase.instance) {
      EditClientUseCase.instance = new EditClientUseCase(clientRepository);
    }
    return EditClientUseCase.instance;
  }

  async execute(client: ClientEntity): Promise<ClientEntity> {
    return this.clientRepository.editClient(client);
  }
}

export default EditClientUseCase;

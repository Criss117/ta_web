import { ClientRepository } from "../repositories/clients.repository";

class DeleteClientUseCase {
  constructor(private readonly clientRepository: ClientRepository) {}
  async execute(id: string, ccNumber: string) {
    return this.clientRepository.deleteClient(id, ccNumber);
  }
}

export default DeleteClientUseCase;

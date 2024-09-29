import ClientEntity from "../entitites/client.entity";
import { ClientRepository } from "../repositories/clients.repository";

class SettleDebtUseCase {
  private static instance: SettleDebtUseCase;
  private constructor(private readonly clientRepository: ClientRepository) {}

  static getInstance(clientRepository: ClientRepository) {
    if (!this.instance) {
      this.instance = new SettleDebtUseCase(clientRepository);
    }
    return this.instance;
  }

  async execute(clientId: number): Promise<ClientEntity> {
    return await this.clientRepository.settleDebt(clientId);
  }
}

export default SettleDebtUseCase;

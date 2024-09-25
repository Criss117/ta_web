import ClientEntity from "../entitites/client.entity";
import { ClientRepository } from "../repositories/clients.repository";

class SettleDebtUseCase {
  private static instance: SettleDebtUseCase;
  private constructor(private readonly clientRepository: ClientRepository) {}

  static getInstance(clientRepository: ClientRepository) {
    if (!SettleDebtUseCase.instance) {
      SettleDebtUseCase.instance = new SettleDebtUseCase(clientRepository);
    }
    return SettleDebtUseCase.instance;
  }

  async execute(clientId: number): Promise<ClientEntity> {
    return await this.clientRepository.settleDebt(clientId);
  }
}

export default SettleDebtUseCase;

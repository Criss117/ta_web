import { FindByIdOrCcNumber } from "../interfaces/find-by-id-or-ccnumber";
import { ClientRepository } from "../repositories/clients.repository";

class FindByIdOrCcNumberUseCase {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(findBy: FindByIdOrCcNumber) {
    return this.clientRepository.findByIdOrCcNumber(findBy);
  }
}

export default FindByIdOrCcNumberUseCase;

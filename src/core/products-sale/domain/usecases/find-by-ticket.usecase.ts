import { FindByTicket } from "../interfaces/find-by-ticket";
import { ProductsSaleRepository } from "../repositories/products-sale.repository";

class FindByTicketUseCase {
  constructor(
    private readonly productsSaleRepository: ProductsSaleRepository
  ) {}

  async execute(findByTicket: FindByTicket) {
    return this.productsSaleRepository.findByTicketId(findByTicket);
  }
}

export default FindByTicketUseCase;

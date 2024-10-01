import TicketToSaleEntity from "../entities/ticket-to-sale.entity";
import { TicketsRepository } from "../repositories/tickets.repository";

class MakePaymentUseCase {
  private static instance: MakePaymentUseCase;

  private constructor(private readonly ticketsRepository: TicketsRepository) {}

  static getInstance(ticketsRepository: TicketsRepository) {
    if (!this.instance) {
      this.instance = new this(ticketsRepository);
    }

    return this.instance;
  }

  async execute(
    newTicket: TicketToSaleEntity,
    userId?: string,
    ccNumber?: string
  ) {
    return await this.ticketsRepository.makePayment(
      newTicket,
      userId,
      ccNumber
    );
  }
}

export default MakePaymentUseCase;

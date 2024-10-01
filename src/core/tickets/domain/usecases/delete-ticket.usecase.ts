import { TicketsRepository } from "../repositories/tickets.repository";

class DeleteTicketUseCase {
  private static instance: DeleteTicketUseCase;

  private constructor(private ticketsRepository: TicketsRepository) {}

  static getInstance(ticketsRepository: TicketsRepository) {
    if (!this.instance) {
      this.instance = new this(ticketsRepository);
    }
    return this.instance;
  }

  async execute(ticketId: string, clientId: string) {
    return await this.ticketsRepository.deleteTicket(ticketId, clientId);
  }
}

export default DeleteTicketUseCase;

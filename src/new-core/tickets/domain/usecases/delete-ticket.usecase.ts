import { TicketsRepository } from "../repositories/tickets.repository";

class DeleteTicketUseCase {
  constructor(private ticketsRepository: TicketsRepository) {}

  async execute(ticketId: number, clientId: number) {
    await this.ticketsRepository.deleteTicket(ticketId, clientId);
  }
}

export default DeleteTicketUseCase;

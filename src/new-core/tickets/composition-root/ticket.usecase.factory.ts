import TicketsRepositoryImpl from "../data/repositories/tickets.repository.impl";
import DeleteTicketUseCase from "../domain/usecases/delete-ticket.usecase";

class TicketUseCaseFactory {
  private static ticketRepository = TicketsRepositoryImpl.getInstance();

  static createDeleteTicket() {
    return new DeleteTicketUseCase(this.ticketRepository);
  }
}

export default TicketUseCaseFactory;

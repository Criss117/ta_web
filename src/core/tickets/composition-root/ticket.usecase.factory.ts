import TicketsRepositoryImpl from "../data/repositories/tickets.repository.impl";
import DeleteTicketUseCase from "../domain/usecases/delete-ticket.usecase";
import MakePaymentUseCase from "../domain/usecases/make-payment.usecase";

class TicketUseCaseFactory {
  private static ticketRepository = TicketsRepositoryImpl.getInstance();

  static createDeleteTicket() {
    return DeleteTicketUseCase.getInstance(this.ticketRepository);
  }

  static createMakePayment() {
    return MakePaymentUseCase.getInstance(this.ticketRepository);
  }
}

export default TicketUseCaseFactory;

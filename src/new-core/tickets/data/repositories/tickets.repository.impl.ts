import { TicketsRepository } from "../../domain/repositories/tickets.repository";
import deleteTicketAction from "../actions/delete-ticket.action";

class TicketsRepositoryImpl implements TicketsRepository {
  private static instance: TicketsRepositoryImpl;

  private constructor() {}

  static getInstance(): TicketsRepositoryImpl {
    if (!TicketsRepositoryImpl.instance) {
      TicketsRepositoryImpl.instance = new TicketsRepositoryImpl();
    }
    return TicketsRepositoryImpl.instance;
  }

  async deleteTicket(ticketId: number, userId: number): Promise<void> {
    await deleteTicketAction(ticketId, userId);
  }
}

export default TicketsRepositoryImpl;

import TicketToSaleEntity from "../entities/ticket-to-sale.entity";
import TicketEntity from "../entities/ticket.entity";

export interface TicketsRepository {
  deleteTicket: (ticketId: number, userId: number) => Promise<void>;

  makePayment: (
    newTicket: TicketToSaleEntity,
    clientId?: number,
    ccNumber?: string
  ) => Promise<TicketEntity>;
}

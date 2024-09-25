export interface TicketsRepository {
  deleteTicket: (ticketId: number, userId: number) => Promise<void>;
}

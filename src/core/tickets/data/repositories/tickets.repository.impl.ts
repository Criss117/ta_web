import TicketToSaleEntity from "../../domain/entities/ticket-to-sale.entity";
import TicketEntity from "../../domain/entities/ticket.entity";
import { TicketsRepository } from "../../domain/repositories/tickets.repository";
import deleteTicketAction from "../actions/delete-ticket.action";
import makePaymentAction from "../actions/make-payment.action";
import TicketMapper from "../mappers/ticket.mapper";

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

  async makePayment(newTicket: TicketToSaleEntity): Promise<TicketEntity> {
    const ticketCreated = await makePaymentAction({
      total: newTicket.total,
      productsSale: newTicket.productsTickets.map((p) => ({
        salePrice: p.salePrice,
        quantity: p.quantity,
        subTotal: p.subTotal,
        productId: p.productId,
      })),
      clientId: newTicket.clientId,
      ccNumber: newTicket.ccNumber,
    });

    if (!ticketCreated.data) {
      throw new Error("No se pudo crear el ticket");
    }

    return TicketMapper.toDomain(ticketCreated.data);
  }
}

export default TicketsRepositoryImpl;

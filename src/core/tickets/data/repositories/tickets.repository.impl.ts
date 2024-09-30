import { NotFoundException } from "@/core/common/lib/errors/exeptions-handler";
import TicketToSaleEntity from "../../domain/entities/ticket-to-sale.entity";
import TicketEntity from "../../domain/entities/ticket.entity";
import { TicketsRepository } from "../../domain/repositories/tickets.repository";
import deleteTicketAction from "../actions/delete-ticket.action";
import makePaymentAction from "../actions/make-payment.action";
import TicketMapper from "../mappers/ticket.mapper";
import { CommonResponse } from "@/core/common/models/types";
import ClientEntity from "@/core/clients/domain/entitites/client.entity";

class TicketsRepositoryImpl implements TicketsRepository {
  private static instance: TicketsRepositoryImpl;

  private constructor() {}

  static getInstance(): TicketsRepositoryImpl {
    if (!TicketsRepositoryImpl.instance) {
      TicketsRepositoryImpl.instance = new TicketsRepositoryImpl();
    }
    return TicketsRepositoryImpl.instance;
  }

  async deleteTicket(
    ticketId: number,
    userId: number
  ): Promise<CommonResponse<ClientEntity | null>> {
    const deletedTicket = await deleteTicketAction(ticketId, userId);

    if (!deletedTicket.data) {
      return NotFoundException.exeption(deletedTicket.error);
    }

    return {
      statusCode: deletedTicket.statusCode,
      data: deletedTicket.data,
    };
  }

  async makePayment(
    newTicket: TicketToSaleEntity
  ): Promise<CommonResponse<TicketEntity | null>> {
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
      return NotFoundException.exeption(ticketCreated.error);
    }

    return {
      statusCode: ticketCreated.statusCode,
      data: TicketMapper.toDomain(ticketCreated.data),
    };
  }
}

export default TicketsRepositoryImpl;

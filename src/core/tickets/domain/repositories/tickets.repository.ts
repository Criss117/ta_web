import { CommonResponse } from "@/core/common/models/types";
import TicketToSaleEntity from "../entities/ticket-to-sale.entity";
import TicketEntity from "../entities/ticket.entity";
import ClientEntity from "@/core/clients/domain/entitites/client.entity";

export interface TicketsRepository {
  deleteTicket: (
    ticketId: string,
    userId: string
  ) => Promise<CommonResponse<ClientEntity | null>>;

  makePayment: (
    newTicket: TicketToSaleEntity,
    clientId?: string,
    ccNumber?: string
  ) => Promise<CommonResponse<TicketEntity | null>>;

  findByid(id: string): Promise<CommonResponse<TicketEntity | null>>;
}

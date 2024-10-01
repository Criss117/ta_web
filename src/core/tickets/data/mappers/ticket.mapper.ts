import { Ticket } from "@prisma/client";
import TicketEntity from "../../domain/entities/ticket.entity";
import { TicketStateEnum } from "../../domain/enums/ticket-state.enum";
import TicketCreatedDto from "../dto/ticket-created.dto";

class TicketMapper {
  static toDomain(ticket: TicketCreatedDto): TicketEntity {
    const ticketEntity = TicketEntity.builder()
      .id(ticket.id)
      .total(ticket.total)
      .state(ticket.state as TicketStateEnum)
      .createdAt(ticket.createdAt)
      .updatedAt(ticket.updatedAt)
      .deletedAt(ticket.deletedAt)
      .isActive(ticket.isActive)
      .productSales(
        ticket.productSale.map((ps) => ({
          ...ps,
          ticket: null,
          product: null,
        }))
      )
      .build();

    return ticketEntity;
  }

  static prismaToDomain(ticket: Ticket): TicketEntity {
    return TicketEntity.builder()
      .id(ticket.id)
      .total(ticket.total)
      .state(ticket.state as TicketStateEnum)
      .createdAt(ticket.createdAt)
      .updatedAt(ticket.updatedAt)
      .deletedAt(ticket.deletedAt)
      .isActive(ticket.isActive)
      .clientId(ticket.clientId as number)
      .build();
  }
}

export default TicketMapper;

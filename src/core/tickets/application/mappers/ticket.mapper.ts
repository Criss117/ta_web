import TicketEntity from "../../domain/entities/ticket.entity";
import { TicketYear } from "../models/types";

class TicketMapper {
  static domainToTicketYear(tickets: Array<TicketEntity>): TicketYear {
    return tickets.reduce((acc: TicketYear, ticket) => {
      if (!ticket.createdAt) return acc;

      const data = new Date(ticket.createdAt);
      const year = data.getFullYear();
      const month = data.getMonth();

      if (!acc[year]) {
        acc[year] = {};
      }

      if (!acc[year][month]) {
        acc[year][month] = [];
      }

      acc[year][month].push({
        id: ticket.id,
        day: data.getUTCDate(),
        dayId: data.getUTCDay(),
        total: ticket.total,
      });

      return acc;
    }, {});
  }
}

export default TicketMapper;

import { Ticket } from "@prisma/client";
import type { TicketYear } from "../models/types";

export class TicketsToListAdapter {
  static adapt(tickets: Ticket[]): TicketYear {
    return tickets.reduce((acc: TicketYear, ticket) => {
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

//2024-09-01T18:18:05.453Z

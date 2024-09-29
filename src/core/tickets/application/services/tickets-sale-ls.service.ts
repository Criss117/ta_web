import { LOCAL_STORAGE_KEYS } from "@/lib/constants/local-storage";
import { TicketTSList } from "../../domain/interfaces/ticket-to-sale.service";
import { z } from "zod";
import { TicketSchema } from "../models/schemas";
import { initalTicketsSaleState } from "../state/use.tickets-sale.state";

interface SetState {
  tickets?: TicketTSList;
  currentTicketId?: number;
}

class LocalStorageService {
  static async getTickets() {
    const ticketsLS: TicketTSList | [] = await JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.TICKETS) || "[]"
    );

    const currentTicketIdLS = await JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_TICKET) || "1"
    );

    if (!ticketsLS) return initalTicketsSaleState;

    try {
      const TicketsSchema = z.array(TicketSchema);

      const newTickets = TicketsSchema.parse(ticketsLS);

      const newCurrentTicketId: number = currentTicketIdLS
        ? currentTicketIdLS
        : 1;

      return {
        currentTicketId: newCurrentTicketId,
        tickets: newTickets.length
          ? newTickets
          : initalTicketsSaleState.tickets,
      };
    } catch (error) {
      console.error(error);
      return initalTicketsSaleState;
    }
  }

  static async setTicketsSaleState({ tickets, currentTicketId }: SetState) {
    if (tickets) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
    }

    if (currentTicketId) {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.CURRENT_TICKET,
        JSON.stringify(currentTicketId)
      );
    }
  }
}

export default LocalStorageService;

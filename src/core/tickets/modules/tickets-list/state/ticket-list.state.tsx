import { create } from "zustand";
import type { TicketList, TicketYear } from "../models/types";

interface TicketListState {
  tickets: TicketYear;
  currentTicket: TicketList | null;
  setTicket: (ticket: TicketYear) => void;
  setCurrentTicket: (ticket: TicketList) => void;
}

export const useTicketListState = create<TicketListState>()((set, get) => ({
  tickets: {},
  currentTicket: null,
  setTicket: (tickets) => {
    set({ tickets });
  },
  setCurrentTicket: (ticket) => {
    set({ currentTicket: ticket });
  },
}));

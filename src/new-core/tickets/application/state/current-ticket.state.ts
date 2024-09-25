"use client";
import { create } from "zustand";
import TicketEntity from "../../domain/entities/ticket.entity";

interface CurrentTicketState {
  currentTicket: TicketEntity | null;
  setCurrentTicket: (ticket: TicketEntity) => void;
  clearState: () => void;
}

const useCurrentTicketState = create<CurrentTicketState>((set) => ({
  currentTicket: null,
  setCurrentTicket: (ticket) => set({ currentTicket: ticket }),
  clearState: () => set({ currentTicket: null }),
}));

export default useCurrentTicketState;

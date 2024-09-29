"use client";
import { create } from "zustand";
import TicketEntity from "../../domain/entities/ticket.entity";

interface CurrentTicketState {
  currentTicket: TicketEntity | null;
  productSelected: string | null;
  setCurrentTicket: (ticket: TicketEntity) => void;
  clearState: () => void;
  setProductSelected: (productSelected: string | null) => void;
}

const useCurrentTicketState = create<CurrentTicketState>((set) => ({
  currentTicket: null,
  productSelected: null,
  setCurrentTicket: (ticket) => set({ currentTicket: ticket }),
  clearState: () => set({ currentTicket: null, productSelected: null }),
  setProductSelected: (productSelected) =>
    set({ productSelected: productSelected }),
}));

export default useCurrentTicketState;

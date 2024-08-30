import { z } from "zod";
import { create } from "zustand";

import { TicketSchema } from "../models/schema";
import type { ProductTicket, Ticket } from "../models/type";
import { LOCAL_STORAGE_KEYS } from "@/lib/constants/local-storage";
import { getAllProducts } from "./get-all-products";

interface State {
  currentTicketId: number;
  tickets: Ticket[];
  clearState: () => void;
  newTicket: () => void;
  deleteTicket: (ticketId: number) => void;
  clearTicket: (ticketId: number) => void;
  setInitialState: (tickets: Ticket[], currentTicketId: number) => void;
  changeCurrentTicketId: (id: number) => void;
  addProductToCurrentTicket: (product: ProductTicket) => void;
  getCurrentTicket: () => Ticket | null;
  removeProductFromCurrentTicket: (barcode: string) => void;
  getStateFromLS: () => void;
  changeSaleORquantity: (
    barcode: string,
    newSalePrice: number,
    newQuantity: number
  ) => void;
}

const initalState = {
  currentTicketId: 1,
  tickets: [
    {
      id: 1,
      label: "Ticket 1",
      products: [],
    },
  ],
};

export const useSaleState = create<State>()((set, get) => ({
  currentTicketId: initalState.currentTicketId,
  tickets: initalState.tickets,
  setInitialState: (tickets, currentTicketId) => {
    set({ tickets, currentTicketId });
  },
  clearState: () => {
    set({
      currentTicketId: initalState.currentTicketId,
      tickets: initalState.tickets,
    });
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TICKETS);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.CURRENT_TICKET);
  },
  changeCurrentTicketId: (id) => {
    set({ currentTicketId: id });
    localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENT_TICKET, JSON.stringify(id));
  },
  addProductToCurrentTicket: (product) => {
    const currentTicketId = get().currentTicketId;
    const tickets = get().tickets;
    const currentTicket = tickets.find(
      (ticket) => ticket.id === currentTicketId
    );

    if (!currentTicket) return;

    const existingProduct = currentTicket.products.find(
      (p) => p.barcode === product.barcode
    );

    const newTicket = currentTicket;

    if (existingProduct) {
      existingProduct.quantity += 1;
      existingProduct.subTotal += product.salePrice;
      existingProduct.currentStock -= 1;

      newTicket.products = currentTicket.products.map((p) => {
        if (p.barcode === product.barcode) {
          return existingProduct;
        }
        return p;
      });
    } else {
      newTicket.products.push(product);
    }

    const newTickets = tickets.map((ticket) => {
      if (ticket.id === currentTicketId) {
        return newTicket;
      }
      return ticket;
    });

    set({ tickets: newTickets });

    localStorage.setItem(
      LOCAL_STORAGE_KEYS.TICKETS,
      JSON.stringify(newTickets)
    );
  },
  newTicket: () => {
    const tickets = get().tickets;

    if (tickets.length === 10) return;

    let newId = -1;

    tickets.forEach((ticket) => {
      if (ticket.id > newId) {
        newId = ticket.id;
      }
    });

    const newTicket = {
      id: newId + 1,
      label: `Ticket ${newId + 1}`,
      products: [],
    };

    const newTickets = [...tickets, newTicket];

    set({ tickets: newTickets, currentTicketId: newTicket.id });
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.TICKETS,
      JSON.stringify(newTickets)
    );
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.CURRENT_TICKET,
      JSON.stringify(newTicket.id)
    );
  },
  deleteTicket: (ticketId) => {
    if (ticketId <= 0) return;

    const { tickets, currentTicketId } = get();

    if (tickets.length <= 1) {
      set({
        currentTicketId: initalState.currentTicketId,
        tickets: initalState.tickets,
      });
      localStorage.removeItem(LOCAL_STORAGE_KEYS.TICKETS);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.CURRENT_TICKET);
      return;
    }
    const newTickets = tickets.filter((ticket) => ticket.id !== ticketId);

    const newCurrentTicketId =
      currentTicketId === ticketId ? newTickets[0].id : currentTicketId;

    set({ tickets: newTickets, currentTicketId: newCurrentTicketId });

    localStorage.setItem(
      LOCAL_STORAGE_KEYS.TICKETS,
      JSON.stringify(newTickets)
    );
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.CURRENT_TICKET,
      JSON.stringify(newCurrentTicketId)
    );
  },
  clearTicket: (ticketId) => {
    if (ticketId <= 0) return;
    const tickets = get().tickets;

    if (tickets.length <= 1) return;

    const newTickets = tickets.map((ticket) => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          products: [],
        };
      }
      return ticket;
    });

    set({ tickets: newTickets });
  },
  getCurrentTicket: () => {
    const { tickets, currentTicketId } = get();

    const currentTicket = tickets.find(
      (ticket) => ticket.id === currentTicketId
    );

    if (!currentTicket) return null;

    return currentTicket;
  },
  changeSaleORquantity: (barcode, newSalePrice, newQuantity) => {
    const { tickets, getCurrentTicket } = get();
    const currentTicket = getCurrentTicket();

    if (!currentTicket) return;

    const newTicket = {
      ...currentTicket,
      products: currentTicket.products.map((product) => {
        if (product.barcode === barcode) {
          const quantity =
            newQuantity > 0 && newQuantity + 1 <= product.stock
              ? newQuantity
              : product.quantity;

          return {
            ...product,
            salePrice: newSalePrice < 0 ? product.originalPrice : newSalePrice,
            quantity,
            subTotal: newSalePrice * newQuantity,
            currentStock: product.stock - newQuantity,
          };
        }
        return product;
      }),
    };

    const newTickets = tickets.map((ticket) => {
      if (ticket.id === currentTicket.id) {
        return newTicket;
      }
      return ticket;
    });

    set({ tickets: newTickets });

    localStorage.setItem(
      LOCAL_STORAGE_KEYS.TICKETS,
      JSON.stringify(newTickets)
    );
  },
  removeProductFromCurrentTicket: (barcode) => {
    const { tickets, getCurrentTicket } = get();
    const currentTicket = getCurrentTicket();

    if (!currentTicket) return;

    const newTicket = {
      ...currentTicket,
      products: currentTicket.products.filter(
        (product) => product.barcode !== barcode
      ),
    };

    const newTickets = tickets.map((ticket) => {
      if (ticket.id === currentTicket.id) {
        return newTicket;
      }
      return ticket;
    });

    set({ tickets: newTickets });

    localStorage.setItem(
      LOCAL_STORAGE_KEYS.TICKETS,
      JSON.stringify(newTickets)
    );
  },
  getStateFromLS: async () => {
    const ticketsLS: Ticket[] | null = await JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.TICKETS) || "[]"
    );

    const currentTicketIdLS = await JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_TICKET) || "0"
    );

    try {
      const TicketsSchema = z.array(TicketSchema);

      const newTickets = TicketsSchema.parse(ticketsLS);

      const newCurrentTicketId = currentTicketIdLS
        ? currentTicketIdLS
        : initalState.currentTicketId;

      set({
        tickets: newTickets.length ? newTickets : initalState.tickets,
        currentTicketId: newCurrentTicketId < 1 ? 1 : newCurrentTicketId,
      });
      return;
    } catch (error) {
      console.error(error);
    }

    set(initalState);
  },
}));

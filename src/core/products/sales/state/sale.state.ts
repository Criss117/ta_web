import { create } from "zustand";
import type { ProductTicket, Ticket } from "../models/type";
import { TicketLS } from "../models/type";
import { LOCAL_STORAGE_KEYS } from "@/lib/constants/local-storage";
import { z } from "zod";
import { TicketSchema } from "../models/schema";

interface State {
  currentTicketId: number;
  tickets: Ticket[];
  newTicket: () => void;
  setInitialState: (tickets: Ticket[], currentTicketId: number) => void;
  changeCurrentTicketId: (id: number) => void;
  addProductToCurrentTicket: (product: ProductTicket) => void;
  getCurrentTicket: () => Ticket | null;
  changeSaleORquantity: (
    barcode: string,
    salePrice: number,
    quantity: number
  ) => void;
  removeProductFromCurrentTicket: (barcode: string) => void;
  getStateFromLS: () => void;
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

export const useSaleState = create<State>((set, get) => ({
  currentTicketId: initalState.currentTicketId,
  tickets: initalState.tickets,
  setInitialState: (tickets, currentTicketId) => {
    set({ tickets, currentTicketId });
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
  getCurrentTicket: () => {
    const { tickets, currentTicketId } = get();

    const currentTicket = tickets.find(
      (ticket) => ticket.id === currentTicketId
    );

    if (!currentTicket) return null;

    return currentTicket;
  },
  changeSaleORquantity: (barcode, salePrice, quantity) => {
    const { tickets, getCurrentTicket } = get();
    const currentTicket = getCurrentTicket();

    if (!currentTicket) return;

    const newTicket = {
      ...currentTicket,
      products: currentTicket.products.map((product) => {
        if (product.barcode === barcode) {
          return {
            ...product,
            salePrice: salePrice < 0 ? product.originalPrice : salePrice,
            quantity: quantity > 0 ? quantity : 1,
            subTotal: salePrice * product.quantity,
            currentStock: product.stock - quantity,
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
      JSON.stringify({ tickets: newTickets })
    );
  },
  getStateFromLS: () => {
    const ticketsLS: Ticket[] | null = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.TICKETS) || "[]"
    );

    const currentTicketIdLS = Number(
      localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_TICKET)
    );

    if (!ticketsLS || !currentTicketIdLS) return;

    try {
      const TicketsSchema = z.array(TicketSchema);

      const newTickets = TicketsSchema.parse(ticketsLS);

      const newCurrentTicketId = currentTicketIdLS
        ? currentTicketIdLS
        : initalState.currentTicketId;

      set({
        tickets: newTickets,
        currentTicketId: newCurrentTicketId,
      });
      return;
    } catch (error) {
      console.error(error);
    }

    set(initalState);
  },
}));

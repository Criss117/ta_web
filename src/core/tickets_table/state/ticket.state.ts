import { create } from "zustand";

import type { Product } from "@prisma/client";
import type { Ticket } from "../models/type";

import { ProductToTicketProduct } from "../adapters/ticket-state.adapter";

interface TicketState {
  currentTicketId: number;
  tickets: Ticket[];
  addProduct: (barCode: string, newProduct?: Product) => void;
  obtainBarCodes: () => string[];
  changeCurrentTicket: (ticketId: number) => void;
  changeTicketName: (ticketId: number, name: string) => void;
  createTicket: () => void;
}

interface InitialData {
  currentTicketId: number;
  tickets: Ticket[];
}

const initialData: InitialData = {
  tickets: [
    {
      id: 1,
      products: [],
      total: 0,
      ticketName: "Ticket 1",
    },
  ],
  currentTicketId: 1,
};

export const useTicketState = create<TicketState>((set, get) => ({
  tickets: initialData.tickets,
  currentTicketId: initialData.currentTicketId,
  addProduct: (barCode: string, newProduct?: Product) => {
    const { tickets, currentTicketId } = get();

    const ticket = tickets.find((ticket) => ticket.id === currentTicketId); // Se busca el ticket actual

    if (!ticket) return;

    // si newProduct existe significa que no existe en el ticket actual
    if (newProduct) {
      const productToTicketProduct = ProductToTicketProduct.adapt(newProduct);
      const newTicket = [...ticket.products, productToTicketProduct];

      const newTickets = tickets.map((ticket) => {
        if (ticket.id === currentTicketId) {
          return {
            ...ticket,
            products: newTicket,
          };
        }

        return ticket;
      });

      set({ tickets: newTickets });

      return;
    }

    const existProduct = ticket.products.find(
      (product) => product.barcode === barCode
    );

    if (!existProduct) return;

    existProduct.quantity += 1;
    existProduct.subtotal += existProduct.originalPrice;

    const newTicket = ticket.products.map((product) => {
      if (product.barcode === barCode) {
        return existProduct;
      }

      return product;
    });

    const newTickets = tickets.map((ticket) => {
      if (ticket.id === currentTicketId) {
        return {
          ...ticket,
          products: newTicket,
        };
      }

      return ticket;
    });

    set({ tickets: newTickets });
    return;
  },

  obtainBarCodes: () => {
    const { tickets, currentTicketId } = get();
    const barcodes = tickets
      .find((ticket) => ticket.id === currentTicketId)
      ?.products.map((product) => product.barcode);

    return barcodes || [];
  },

  changeCurrentTicket: (ticketId: number) => {
    set({ currentTicketId: ticketId });
  },

  changeTicketName: (ticketId: number, name: string) => {
    const { tickets } = get();
    const newTickets = tickets.map((ticket) => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          ticketName: name,
        };
      }

      return ticket;
    });

    set({ tickets: newTickets });
  },

  createTicket: () => {
    const { tickets } = get();

    let lastTicketId = 0;

    tickets.forEach((ticket) => {
      if (ticket.id > lastTicketId) {
        lastTicketId = ticket.id;
      }
    });

    const newTickets = [
      ...tickets,
      {
        id: lastTicketId + 1,
        ticketName: `Ticket ${lastTicketId + 1}`,
        products: [],
        total: 0,
      },
    ];

    set({ tickets: newTickets, currentTicketId: lastTicketId + 1 });
  },
}));

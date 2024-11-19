import { create } from "zustand";

import ProductEntity from "@/core/products/domain/entities/product.entity";

import TicketToSaleEntity from "../../domain/entities/ticket-to-sale.entity";
import type {
  ChangeSalePriceOrQuantity,
  TicketTSList,
} from "../../domain/interfaces/ticket-to-sale.service";
import TicketServiceFactory from "../../composition-root/ticket.service.factory";
import LocalStorageService from "../services/tickets-sale-ls.service";

interface TicketsSaleState {
  currentTicketId: number;
  tickets: TicketTSList;
  // setInitialState: (tickets: TicketTSList, currentTicketId: number) => void;
  getStateFromLS: () => void;
  changeCurrentTicketId: (id: number) => void;
  clearTickets(): void;
  setNewTicket(): void;
  deleteTicket(ticketId: number): void;
  clearTicket(ticketId?: number): void;
  addProductToCurrentTicket(product: ProductEntity): void;
  getCurrentTicket(): TicketToSaleEntity | null;
  removeProductFromCurrentTicket(barcode: string): void;
  changeSalePriceOrQuantity(pInfo: ChangeSalePriceOrQuantity): void;
  changeToWholeSalePrice(barcode: string): void;
}

export const initalTicketsSaleState = {
  currentTicketId: 1,
  tickets: [
    TicketToSaleEntity.builder().id(1).label("Ticket 1").total(0).build(),
  ],
};

const useTicketsSaleState = create<TicketsSaleState>()((set, get) => {
  const ticketService = TicketServiceFactory.createTicketToSaleService();

  return {
    currentTicketId: initalTicketsSaleState.currentTicketId,
    tickets: initalTicketsSaleState.tickets,

    clearTickets: () => {
      set({
        currentTicketId: initalTicketsSaleState.currentTicketId,
        tickets: initalTicketsSaleState.tickets,
      });
      LocalStorageService.setTicketsSaleState({
        currentTicketId: initalTicketsSaleState.currentTicketId,
        tickets: initalTicketsSaleState.tickets,
      });
    },
    changeCurrentTicketId: (id) => {
      set({ currentTicketId: id });
      LocalStorageService.setTicketsSaleState({
        currentTicketId: id,
      });
    },
    setNewTicket: () => {
      const tickets = get().tickets;

      if (tickets.length === 10) return;

      const newTickets = ticketService.setNewTicket(tickets);

      set({
        tickets: newTickets.tickets,
        currentTicketId: newTickets.currentTicketId,
      });
      LocalStorageService.setTicketsSaleState({
        tickets: newTickets.tickets,
        currentTicketId: newTickets.currentTicketId,
      });
    },
    deleteTicket: (ticketId) => {
      const newTickets = ticketService.deleteTicket(
        get().tickets,
        get().currentTicketId,
        ticketId
      );
      set({
        tickets: newTickets.tickets,
        currentTicketId: newTickets.currentTicketId,
      });
      LocalStorageService.setTicketsSaleState({
        tickets: newTickets.tickets,
        currentTicketId: newTickets.currentTicketId,
      });
    },
    clearTicket: (ticketId) => {
      const newTickets = ticketService.clearTicket(
        get().tickets,
        get().currentTicketId,
        ticketId
      );
      set({
        tickets: newTickets.tickets,
        currentTicketId: newTickets.currentTicketId,
      });
      LocalStorageService.setTicketsSaleState({
        tickets: newTickets.tickets,
        currentTicketId: newTickets.currentTicketId,
      });
    },
    addProductToCurrentTicket: (product) => {
      const newTickets = ticketService.addProductToCurrentTicket(
        get().tickets,
        get().currentTicketId,
        product
      );
      set({
        tickets: newTickets,
      });
      LocalStorageService.setTicketsSaleState({
        tickets: newTickets,
      });
    },
    getCurrentTicket: () => {
      return ticketService.getCurrentTicket(
        get().tickets,
        get().currentTicketId
      );
    },
    removeProductFromCurrentTicket: (barcode) => {
      const newTickets = ticketService.removeProductFromCurrentTicket(
        get().tickets,
        get().currentTicketId,
        barcode
      );
      set({
        tickets: newTickets,
      });
      LocalStorageService.setTicketsSaleState({
        tickets: newTickets,
      });
    },
    changeSalePriceOrQuantity: (pInfo) => {
      const newTickets = ticketService.changeSalePriceOrQuantity(
        get().tickets,
        get().currentTicketId,
        pInfo
      );
      set({
        tickets: newTickets,
      });
      LocalStorageService.setTicketsSaleState({
        tickets: newTickets,
      });
    },
    getStateFromLS: async () => {
      const { tickets, currentTicketId } =
        await LocalStorageService.getTickets();
      set({ tickets, currentTicketId });
    },
    changeToWholeSalePrice: (barcode) => {
      const newTickets = ticketService.changeToWholeSalePrice(
        get().tickets,
        get().currentTicketId,
        barcode
      );
      set({
        tickets: newTickets,
      });
      LocalStorageService.setTicketsSaleState({
        tickets: newTickets,
      });
    },
  };
});

export default useTicketsSaleState;

// const useTicketsSaleState = create<TicketsSaleState>()((set, get) => {
//   const ticketService = TicketServiceFactory.createTicketToSaleService();

//   return {
//     currentTicketId: initalTicketsSaleState.currentTicketId,
//     tickets: initalTicketsSaleState.tickets,
//     clearTickets: () => {
//       set({
//         currentTicketId: initalTicketsSaleState.currentTicketId,
//         tickets: initalTicketsSaleState.tickets,
//       });
//     },
//     changeCurrentTicketId: (id) => {
//       set({ currentTicketId: id });
//     },
//     setNewTicket: () => {
//       const tickets = get().tickets;

//       if (tickets.length === 10) return;

//       const newTickets = ticketService.setNewTicket(tickets);

//       set({
//         tickets: newTickets.tickets,
//         currentTicketId: newTickets.currentTicketId,
//       });
//     },
//     deleteTicket: (ticketId) => {
//       const newTickets = ticketService.deleteTicket(
//         get().tickets,
//         get().currentTicketId,
//         ticketId
//       );
//       set({
//         tickets: newTickets.tickets,
//         currentTicketId: newTickets.currentTicketId,
//       });
//     },
//     clearTicket: (ticketId) => {
//       const newTickets = ticketService.clearTicket(
//         get().tickets,
//         get().currentTicketId,
//         ticketId
//       );
//       set({
//         tickets: newTickets.tickets,
//         currentTicketId: newTickets.currentTicketId,
//       });
//     },
//     addProductToCurrentTicket: (product) => {
//       const newTickets = ticketService.addProductToCurrentTicket(
//         get().tickets,
//         get().currentTicketId,
//         product
//       );
//       set({
//         tickets: newTickets,
//       });
//     },
//     getCurrentTicket: () => {
//       return ticketService.getCurrentTicket(
//         get().tickets,
//         get().currentTicketId
//       );
//     },
//     removeProductFromCurrentTicket: (barcode) => {
//       const newTickets = ticketService.removeProductFromCurrentTicket(
//         get().tickets,
//         get().currentTicketId,
//         barcode
//       );
//       set({
//         tickets: newTickets,
//       });
//     },
//     changeSalePriceOrQuantity: (pInfo) => {
//       const newTickets = ticketService.changeSalePriceOrQuantity(
//         get().tickets,
//         get().currentTicketId,
//         pInfo
//       );
//       set({
//         tickets: newTickets,
//       });
//     },
//   };
// });

// export default useTicketsSaleState;

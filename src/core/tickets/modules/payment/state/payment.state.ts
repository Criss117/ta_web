"use client";

import { create } from "zustand";
import { ProductSale } from "../models/types";
import { ClientPay } from "@/core/clients/modules/client-list/models/types";
import { TicketStateEnum } from "../models/enum";

interface State {
  ticketState: TicketStateEnum;
  client: ClientPay | undefined;
  total: number;
  products: ProductSale[] | [];
  setInitialState: (products: ProductSale[]) => void;
  setClient: (client: ClientPay | undefined) => void;
  setTicketState: (ticketState: TicketStateEnum) => void;
}

export const usePaymentState = create<State>((set) => ({
  ticketState: TicketStateEnum.PAID,
  client: undefined,
  total: 0,
  products: [],
  setInitialState: (products) => {
    if (!products) return;

    const total = products.reduce((acc, product) => {
      return acc + product.subTotal;
    }, 0);

    set({ products, total });
  },
  setClient: (client) => {
    set({ client });
  },
  setTicketState: (ticketState) => {
    set({ ticketState });
  },
}));

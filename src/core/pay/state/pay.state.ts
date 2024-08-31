"use client";

import { create } from "zustand";
import { ProductSale } from "../models/types";

interface State {
  clientId?: number;
  total: number;
  products: ProductSale[] | [];
  setInitialState: (products: ProductSale[]) => void;
}

export const usePayState = create<State>((set) => ({
  clientId: undefined,
  total: 0,
  products: [],
  setInitialState: (products) => {
    if (!products) return;

    const total = products.reduce((acc, product) => {
      return acc + product.subTotal;
    }, 0);

    set({ products, total });
  },
}));

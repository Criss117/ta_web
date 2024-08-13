"use client";

import { create } from "zustand";
import { ProductPay } from "../models/types";

interface State {
  total: number;
  products: ProductPay[] | [];
  setInitialState: (products: ProductPay[]) => void;
}

export const usePayState = create<State>((set) => ({
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

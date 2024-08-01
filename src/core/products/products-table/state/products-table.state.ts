import { create } from "zustand";

interface State {
  totalProducts: number;
  totalPage: number;
  setTotalProducts: (totalProducts: number, totalPage: number) => void;
}

export const useProductsTableState = create<State>((set) => ({
  totalProducts: -1,
  totalPage: -1,
  setTotalProducts: (totalProducts, totalPage) =>
    set({ totalProducts, totalPage }),
}));

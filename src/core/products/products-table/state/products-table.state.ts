import { create } from "zustand";

interface State {
  query: string;
  totalProducts: number;
  totalPage: number;
  setTotalProducts: (totalProducts: number, totalPage: number) => void;
  setQuery: (query: string) => void;
}

export const useProductsTableState = create<State>((set) => ({
  query: "",
  totalProducts: -1,
  totalPage: -1,
  setTotalProducts: (totalProducts, totalPage) =>
    set({ totalProducts, totalPage }),

  setQuery: (query: string) => {
    set({ query });
  },
}));

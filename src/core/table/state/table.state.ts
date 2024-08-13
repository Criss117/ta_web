import { create } from "zustand";

interface State {
  query: string;
  totalItems: number;
  totalPage: number;
  setTotalItems: (totalProducts: number, totalPage: number) => void;
  setQuery: (query: string) => void;
  clearState: () => void;
}

export const useTableState = create<State>((set) => ({
  query: "",
  totalItems: -1,
  totalPage: -1,

  setTotalItems: (totalItems, totalPage) => set({ totalItems, totalPage }),
  setQuery: (query) => set({ query }),
  clearState: () => set({ query: "", totalItems: -1, totalPage: -1 }),
}));

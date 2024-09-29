import { create } from "zustand";

export type OffSet = 10 | 20 | 30 | 40 | 50;

interface PageableState {
  query: string;
  offset: OffSet;
  page: number;

  setPage: (offset: OffSet, page: number) => void;
  setQuery: (query: string) => void;
  clearState: () => void;
}

const usePageableState = create<PageableState>((set) => ({
  query: "",
  offset: 10,
  page: 0,
  setPage: (offset: OffSet, page: number) => {
    set({ offset, page });
  },
  setQuery: (query: string) => {
    set({ query });
  },
  clearState: () => {
    set({ query: "", offset: 10, page: 0 });
  },
}));

export default usePageableState;

import { create } from "zustand";
import ProductEntity from "../../domain/entities/product.entity";

interface SelectedProductState {
  selectedProduct: ProductEntity | null;
  setSelectedProduct: (selectedProduct: ProductEntity | null) => void;
  clearState: () => void;
}

const useSelectedProductState = create<SelectedProductState>()((set) => ({
  selectedProduct: null,
  setSelectedProduct(selectedProduct: ProductEntity | null) {
    set({ selectedProduct });
  },

  clearState() {
    set({ selectedProduct: null });
  },
}));

export default useSelectedProductState;

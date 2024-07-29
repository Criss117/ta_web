import { create } from "zustand";

import { Product } from "@prisma/client";
import { ProductForm } from "../models/types";

interface ProductFormState {
  product: ProductForm;
  setProduct: (product: Product) => void;
}

const initialData: ProductForm = {
  id: -1,
  barcode: "",
  description: "",
  costPrice: 0,
  salePrice: 0,
  wholesalePrice: 0,
  stock: 0,
  minStock: 0,
};

const initialData2: ProductForm = {
  id: -1,
  barcode: "holaa",
  description: "description",
  costPrice: 100,
  salePrice: 100,
  wholesalePrice: 100,
  stock: 100,
  minStock: 10,
};

export const useProductFormState = create<ProductFormState>((set) => ({
  product: initialData2,
  setProduct: (product: Product) => set(() => ({ product })),
}));

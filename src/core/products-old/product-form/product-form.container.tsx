"use client";

import ProductsSearchContainer from "../products-search/products-search.container";
import ProductForm from "./components/product-form";
import { useProductFormState } from "./state/product-form.state";

interface Props {
  barcode?: string;
  onPage: "create" | "edit";
}

function ProductFormContainer({ barcode, onPage }: Props) {
  const { setProductToEdit } = useProductFormState();

  if (!barcode && onPage === "edit")
    return <ProductsSearchContainer addToState={setProductToEdit} toEdit />;

  if (barcode && onPage === "edit")
    return <ProductForm barcode={barcode} onPage={onPage} />;

  if (onPage === "edit") return <ProductForm onPage={onPage} />;

  return <ProductForm onPage={onPage} />;
}

export default ProductFormContainer;

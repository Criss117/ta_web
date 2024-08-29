"use client";
import SearchBarQuery from "@/components/form/search-bar-query";
import SearchBarForm from "./components/searchbar-form";

interface Props {
  onTicket?: boolean;
  searchByQueryFn?: (query: string) => void;
  searchByBarcodeFn?: (barcode: string) => void;
}

const ProductsSearchContainer = ({
  onTicket = false,
  searchByQueryFn,
  searchByBarcodeFn,
}: Props) => {
  return (
    <>
      {onTicket ? (
        <SearchBarForm searchByBarcodeFn={searchByBarcodeFn} />
      ) : (
        <SearchBarQuery
          searchByQueryFn={searchByQueryFn}
          label="Codigo de barras o Descripción"
        />
      )}
    </>
  );
};

export default ProductsSearchContainer;

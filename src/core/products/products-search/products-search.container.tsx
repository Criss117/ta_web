"use client";
import SearchBarForm from "./components/searchbar-form";
import SearchBarQuery from "./components/searchbar-query";

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
        <SearchBarQuery searchByQueryFn={searchByQueryFn} />
      )}
    </>
  );
};

export default ProductsSearchContainer;

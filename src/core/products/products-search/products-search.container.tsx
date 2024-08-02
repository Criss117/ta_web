"use client";
import SearchBarForm from "./components/searchbar-form";
import SearchBarQuery from "./components/searchbarquery";

interface Props {
  onTicket?: boolean;
  searchByQueryFn?: (query: string) => void;
}

const ProductsSearchContainer = ({
  onTicket = false,
  searchByQueryFn,
}: Props) => {
  return (
    <>
      {onTicket ? (
        <SearchBarForm />
      ) : (
        <SearchBarQuery searchByQueryFn={searchByQueryFn} />
      )}
    </>
  );
};

export default ProductsSearchContainer;

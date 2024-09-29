"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { ROUTES } from "@/lib/constants/nav";
import SearchBarQuery from "@/components/form/search-bar-query";
import { buttonVariants } from "@/components/ui/button";

import ProductsTable from "../components/products-table/products-table";
import usePageableState, { OffSet } from "@Core/common/state/pageable.state";

interface Props {
  page: number;
  offset: number;
}

const ProductsTableScreen = ({ offset, page }: Props) => {
  const { query, setPage, setQuery, clearState } = usePageableState();

  useEffect(() => {
    setPage(offset as OffSet, page);

    return () => {
      clearState();
    };
  }, [offset, page]);

  return (
    <div className="border mt-10 mx-5 py-10 rounded-xl">
      <div className="mx-10 flex justify-between">
        <SearchBarQuery
          searchByQueryFn={(query) => setQuery(query)}
          label="Código de barras o descripción"
        />

        <Link
          className={buttonVariants({ variant: "default" })}
          href={ROUTES.CREATE_PRODUCTS}
        >
          Crear un producto
        </Link>
      </div>
      <ProductsTable page={page} offset={offset} query={query} />
    </div>
  );
};

export default ProductsTableScreen;

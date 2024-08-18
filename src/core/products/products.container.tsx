"use client";

import Link from "next/link";
import { useEffect } from "react";

import { ROUTES } from "@/lib/constants/nav";
import { buttonVariants } from "@/components/ui/button";

import ProductTableContainer from "./modules/products-table/products-table.container";
import ProductsSearchContainer from "./modules/products-search/products-search.container";
import { useTableState } from "../table/state/table.state";

interface Props {
  page: number;
  offset: number;
}

const ProductContainer = ({ page, offset }: Props) => {
  const { query, setQuery, clearState } = useTableState();

  useEffect(() => {
    return () => {
      clearState();
    };
  }, []);

  return (
    <div className="border mt-10 mx-5 py-10 rounded-xl">
      <div className="mx-10 flex justify-between">
        <ProductsSearchContainer
          searchByQueryFn={(query) => {
            setQuery(query);
          }}
        />
        <Link
          className={buttonVariants({ variant: "default" })}
          href={ROUTES.CREATE_PRODUCTS}
        >
          Crear un producto
        </Link>
      </div>
      <ProductTableContainer page={page} offset={offset} query={query} />
    </div>
  );
};

export default ProductContainer;

"use client";

import Link from "next/link";
import ProductsSearchContainer from "./products-search/products-search.container";
import ProductTableContainer from "./products-table/products-table.container";
import { useProductsTableState } from "./products-table/state/products-table.state";
import { ROUTES } from "@/lib/constants/nav";
import { buttonVariants } from "@/components/ui/button";

interface Props {
  page: number;
  offset: number;
}

const ProductContainer = ({ page, offset }: Props) => {
  const { query, setQuery } = useProductsTableState();

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

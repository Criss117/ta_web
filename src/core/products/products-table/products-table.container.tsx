"use client";

import useProductTable from "./hooks/use.product-table";
import { useEffect } from "react";
import ProductsTable from "./components/products-table";
import ProductsTablePag from "./components/products-table-pag";
import { useProductsTableState } from "./state/products-table.state";
import { CountProductsService } from "./services/count-products.service";

interface Props {
  page: number;
  offset: number;
}

const ProductTableContainer = ({ offset, page }: Props) => {
  const { findProductsQuery } = useProductTable({ page, offset });
  const { totalProducts, totalPage, setTotalProducts } =
    useProductsTableState();

  useEffect(() => {
    if (page <= 0) return;
    findProductsQuery.refetch();
  }, [page, offset]);

  useEffect(() => {
    CountProductsService.countToPagination(offset).then((count) =>
      setTotalProducts(count.totalProducts, count.totalPage)
    );
  }, [offset]);

  return (
    <section className="mx-10">
      <ProductsTablePag
        page={page}
        offset={offset}
        productCount={{ totalProducts, totalPage }}
      />
      <ProductsTable data={findProductsQuery.data || []} offset={offset} />
      <ProductsTablePag
        page={page}
        offset={offset}
        productCount={{ totalProducts, totalPage }}
      />
    </section>
  );
};

export default ProductTableContainer;

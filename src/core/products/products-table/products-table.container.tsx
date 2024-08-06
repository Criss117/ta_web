"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import useProductTable from "./hooks/use.product-table";
import ProductsTable from "./components/products-table";
import ProductsTablePag from "./components/products-table-pag";
import { useProductsTableState } from "./state/products-table.state";
import { CountProductsService } from "./services/count-products.service";

interface Props {
  page: number;
  offset: number;
  query?: string;
}

const ProductTableContainer = ({ offset, page, query }: Props) => {
  const router = useRouter();
  const { totalProducts, totalPage, setTotalProducts } =
    useProductsTableState();

  const { findProductsQuery } = useProductTable({
    page,
    offset,
    filters: { query },
  });

  useEffect(() => {
    if (page <= 0) return;
    findProductsQuery.refetch();
  }, [page, offset, query]);

  useEffect(() => {
    if (query) return;
    CountProductsService.countToPagination(offset).then((count) =>
      setTotalProducts(count.totalProducts, count.totalPage)
    );
  }, [offset]);

  useEffect(() => {
    CountProductsService.countToPagination(offset, query).then((count) => {
      setTotalProducts(count.totalProducts, count.totalPage);
      router.push(`?page=1&offset=${offset}`);
    });
  }, [offset, query]);

  return (
    <section>
      <ProductsTablePag
        page={page}
        offset={offset}
        productCount={{ totalProducts, totalPage }}
      />
      <ProductsTable
        data={findProductsQuery.data?.data || []}
        offset={offset}
        isFetching={findProductsQuery.isFetching}
      />
      <ProductsTablePag
        page={page}
        offset={offset}
        productCount={{ totalProducts, totalPage }}
      />
    </section>
  );
};

export default ProductTableContainer;

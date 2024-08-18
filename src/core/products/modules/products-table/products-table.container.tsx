"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import useProductTable from "./hooks/use.product-table";
import { CountProductsService } from "./services/count-products.service";
import TablePag from "@/components/table/table-pag";
import { useTableState } from "@/core/table/state/table.state";
import TableComponent from "@/core/table/components/products-table";
import { productsColumns } from "./components/products-colums";

interface Props {
  page: number;
  offset: number;
  query?: string;
}

const ProductTableContainer = ({ offset, page, query }: Props) => {
  const router = useRouter();
  const { totalItems, totalPage, setTotalItems } = useTableState();

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
      setTotalItems(count.totalProducts, count.totalPage)
    );
  }, [offset]);

  useEffect(() => {
    CountProductsService.countToPagination(offset, query).then((count) => {
      setTotalItems(count.totalProducts, count.totalPage);
      router.push(`?page=1&offset=${offset}`);
    });
  }, [offset, query]);

  return (
    <section>
      <TablePag page={page} offset={offset} count={{ totalItems, totalPage }} />
      <TableComponent
        data={findProductsQuery.data?.data || []}
        offset={offset}
        isFetching={findProductsQuery.isFetching}
        columns={productsColumns}
      />
      <TablePag page={page} offset={offset} count={{ totalItems, totalPage }} />
    </section>
  );
};

export default ProductTableContainer;

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import useProductsTable from "@Core/products/application/hooks/use.products-table";
import TablePag from "@/components/table/table-pag";
import TableComponent from "@Core/table/components/table-component";

import { productsColumns } from "./products-column";

interface Props {
  page: number;
  offset: number;
  query?: string;
}

const ProductsTable = ({ offset, page, query }: Props) => {
  const router = useRouter();

  const { data, findProductsQuery } = useProductsTable({
    page,
    offset,
    filters: { query },
  });

  useEffect(() => {
    if (data?.totalPage && page > data?.totalPage) {
      router.push(`?page=1&offset=${offset}`);
    }
  }, [page, data?.totalPage]);

  return (
    <section>
      <TablePag
        page={page}
        offset={offset}
        count={{
          totalItems: data?.total || 0,
          totalPage: data?.totalPage || 0,
        }}
      />
      <TableComponent
        data={data?.items || []}
        offset={offset}
        isFetching={findProductsQuery.isFetching}
        columns={productsColumns}
      />
      <TablePag
        page={page}
        offset={offset}
        count={{
          totalItems: data?.total || 0,
          totalPage: data?.totalPage || 0,
        }}
      />
    </section>
  );
};

export default ProductsTable;

"use client";
import { useTableState } from "@/core/table/state/table.state";
import useClientsTable from "./hooks/use.clients-table";
import { useEffect } from "react";
import TableComponent from "@/core/table/components/products-table";
import { clientsColumns } from "./components/clients-column";

interface Props {
  page: number;
  offset: number;
  query?: string;
}

const ClientsTableContainer = ({ offset, page, query }: Props) => {
  const { totalItems, totalPage, setTotalItems } = useTableState();
  const { findClientsQuery } = useClientsTable({
    page,
    offset,
    filters: { query },
  });

  useEffect(() => {
    if (page <= 0) return;
    findClientsQuery.refetch();
  }, [page, offset, query]);

  // useEffect(() => {
  //   if (query) return;
  //   CountProductsService.countToPagination(offset).then((count) =>
  //     setTotalItems(count.totalProducts, count.totalPage)
  //   );
  // }, [offset]);

  // useEffect(() => {
  //   CountProductsService.countToPagination(offset, query).then((count) => {
  //     setTotalItems(count.totalProducts, count.totalPage);
  //     router.push(`?page=1&offset=${offset}`);
  //   });
  // }, [offset, query]);

  return (
    <section>
      <TableComponent
        data={findClientsQuery.data?.data || []}
        offset={offset}
        isFetching={findClientsQuery.isFetching}
        columns={clientsColumns}
      />

      <pre>
        <code>{JSON.stringify(findClientsQuery.data, null, 2)}</code>
      </pre>
    </section>
  );
};

export default ClientsTableContainer;

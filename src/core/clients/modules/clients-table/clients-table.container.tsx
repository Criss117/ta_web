"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import TablePag from "@/components/table/table-pag";
import useClientsTable from "./hooks/use.clients-table";
import { clientsColumns } from "./components/clients-column";
import { useTableState } from "@/core/table/state/table.state";
import TableComponent from "@/core/table/components/products-table";
import { countClientsAction } from "./actions/find-clients.action";

interface Props {
  page: number;
  offset: number;
  query?: string;
}

const ClientsTableContainer = ({ offset, page, query }: Props) => {
  const router = useRouter();
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

  useEffect(() => {
    if (query) return;
    countClientsAction({ offset }).then(({ data }) => {
      if (!data) return;
      setTotalItems(data.totalItems, data.totalPage);
    });
  }, [offset]);

  useEffect(() => {
    countClientsAction({ offset, query }).then(({ data }) => {
      if (!data) return;
      setTotalItems(data.totalItems, data.totalPage);
      router.push(`?page=1&offset=${offset}`);
    });
  }, [offset, query]);

  return (
    <section>
      <TablePag page={page} offset={offset} count={{ totalItems, totalPage }} />
      <TableComponent
        data={findClientsQuery.data?.data || []}
        offset={offset}
        isFetching={findClientsQuery.isFetching}
        columns={clientsColumns}
      />
      <TablePag page={page} offset={offset} count={{ totalItems, totalPage }} />
    </section>
  );
};

export default ClientsTableContainer;

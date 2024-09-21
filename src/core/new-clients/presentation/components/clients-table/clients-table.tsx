"use client";
import { useEffect } from "react";

import TableComponent from "@/core/table/components/table-component";
import { clientsColumns } from "./clients-column";
import useClientsTable from "../../hooks/use.clients-table";
import TablePag from "@/components/table/table-pag";

interface Props {
  page: number;
  offset: number;
  query?: string;
}

const ClientsTable = ({ offset, page, query }: Props) => {
  const { data, findClientsQuery } = useClientsTable({
    page,
    offset,
    filters: { query },
  });

  useEffect(() => {
    if (page <= 0) return;
    findClientsQuery.refetch();
  }, [page, offset, query]);

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
        isFetching={findClientsQuery.isFetching}
        columns={clientsColumns}
        navigateTo={"clients/"}
        objectName="ccNumber"
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

export default ClientsTable;

"use client";
import { useEffect } from "react";

import { clientsColumns } from "./clients-column";
import useClientsTable from "../../../application/hooks/use.clients-table";
import TablePag from "@/components/table/table-pag";
import { useRouter } from "next/navigation";
import TableComponent from "@Core/table/components/table-component";

interface Props {
  page: number;
  offset: number;
  query?: string;
}

const ClientsTable = ({ offset, page, query }: Props) => {
  const router = useRouter();
  const { data, findClientsQuery } = useClientsTable({
    page,
    offset,
    filters: { query },
  });

  useEffect(() => {
    if (page <= 0) return;
    findClientsQuery.refetch();
  }, [page, offset, query]);

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

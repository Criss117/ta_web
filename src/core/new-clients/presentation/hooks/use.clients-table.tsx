"use client";
import type { Filters } from "@/core/common/models/types";
import useFindClients from "./use.find-clients";

interface Props {
  page?: number;
  offset?: number;
  filters?: Filters;
}

const useClientsTable = ({ page = 1, offset = 10, filters }: Props) => {
  const findClientsQuery = useFindClients({
    page,
    offset,
    filters,
    queryKey: ["clients", page - 1, offset, filters?.query || "all"],
  });

  return { data: findClientsQuery.data, findClientsQuery };
};

export default useClientsTable;

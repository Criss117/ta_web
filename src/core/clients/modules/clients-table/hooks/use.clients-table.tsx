"use client";
import useFindClients from "@/core/clients/hooks/use.find-clients";
import type { Filters } from "@/core/common/models/types";

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

  return { findClientsQuery };
};

export default useClientsTable;

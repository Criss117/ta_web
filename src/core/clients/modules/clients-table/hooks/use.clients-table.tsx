import type { Filters } from "@/core/common/models/types";
import { useQuery } from "@tanstack/react-query";
import { findClientsAction } from "../actions/find-clients.action";

interface Props {
  page?: number;
  offset?: number;
  filters?: Filters;
}

async function findClients({
  page,
  offset,
  filters,
}: {
  page: number;
  offset: number;
  filters?: Filters;
}) {
  return await findClientsAction({ page, offset, filters });
}

const useClientsTable = ({ page = 1, offset = 10, filters }: Props) => {
  const findClientsQuery = useQuery({
    queryKey: ["clients", page - 1, offset, filters?.query || "all"],
    queryFn: () => findClients({ page: page - 1, offset, filters }),
    enabled: false,
    refetchOnWindowFocus: false,
  });
  return { findClientsQuery };
};

export default useClientsTable;

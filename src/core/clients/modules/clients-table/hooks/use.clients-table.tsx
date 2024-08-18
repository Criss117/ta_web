import type { Filters } from "@/core/models/types";
import { FindClientsService } from "../services/find-clients.service";
import { useQuery } from "@tanstack/react-query";

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
  const findClients = new FindClientsService(page, offset, filters);
  return await findClients.execute();
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

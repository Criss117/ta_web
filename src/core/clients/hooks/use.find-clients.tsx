"use client";
import { useQuery } from "@tanstack/react-query";

import { findClientsAction } from "@/core/clients/actions/find-clients.action";
import type {
  Filters,
  FindEntitiesReturnType,
} from "@/core/common/models/types";
import type { Client } from "@prisma/client";

interface Props {
  queryKey: (string | number)[];
  page?: number;
  offset?: number;
  filters?: Filters;
  enabled?: boolean;
}

async function findClients({
  page,
  offset,
  filters,
}: {
  page: number;
  offset: number;
  filters?: Filters;
}): Promise<FindEntitiesReturnType<Client[]>> {
  return await findClientsAction({ page, offset, filters });
}

const useFindClients = ({
  page = 1,
  offset = 10,
  filters,
  queryKey,
  enabled = false,
}: Props) => {
  const findClientsQuery = useQuery({
    queryKey,
    queryFn: () => findClients({ page: page - 1, offset, filters }),
    enabled,
    refetchOnWindowFocus: false,
  });

  return findClientsQuery;
};

export default useFindClients;

"use client";
import { useQuery } from "@tanstack/react-query";

import ClientUseCasesFactory from "../../composition-root/client-usecases.factory";
import type { Filters } from "@/core/common/models/types";

interface Props {
  queryKey: (string | number)[];
  page?: number;
  offset?: number;
  filters?: Filters;
  enabled?: boolean;
}

async function findClients(page: number, offset: number, filters?: Filters) {
  const findClientsUseCase = ClientUseCasesFactory.createFindClients();
  return await findClientsUseCase.execute(offset, page, filters);
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
    queryFn: () => findClients(page - 1, offset, filters),
    enabled,
    refetchOnWindowFocus: false,
  });

  return findClientsQuery;
};

export default useFindClients;

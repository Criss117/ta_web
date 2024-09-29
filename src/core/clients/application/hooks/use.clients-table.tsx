"use client";
import { useQuery } from "@tanstack/react-query";

import { Filters } from "@Core/common/models/types";

import ClientUseCasesFactory from "../../composition-root/client-usecases.factory";

interface Props {
  page?: number;
  offset?: number;
  filters?: Filters;
}

async function findClients(page: number, offset: number, filters?: Filters) {
  const findClientsUseCase = ClientUseCasesFactory.createFindClients();
  return await findClientsUseCase.execute(offset, page, filters);
}

const useClientsTable = ({ page = 1, offset = 10, filters }: Props) => {
  const findClientsQuery = useQuery({
    queryKey: ["clients", page - 1, offset, filters?.query || "all"],
    queryFn: () => findClients(page - 1, offset, filters),
    refetchOnWindowFocus: false,
  });

  const refetch = () => {
    findClientsQuery.refetch();
  };

  return { data: findClientsQuery.data?.data, findClientsQuery, refetch };
};

export default useClientsTable;

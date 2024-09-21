"use client";
import { useQuery } from "@tanstack/react-query";

import { findClientsAction } from "@/core/clients/actions/find-clients.action";
import type {
  Filters,
  FindEntitiesReturnType,
} from "@/core/common/models/types";
import type { Client } from "@prisma/client";
import { ClientRepository } from "../../domain/repositories/clients.repository";
import ClientRepositoryImlp from "../../data/repositories/client.repository.impl";
import { FindClientsUseCase } from "../../domain/usecases/find-clients.usecase";

interface Props {
  queryKey: (string | number)[];
  page?: number;
  offset?: number;
  filters?: Filters;
  enabled?: boolean;
}

async function findClients(page: number, offset: number, filters?: Filters) {
  const findClientsUseCase = new FindClientsUseCase(
    ClientRepositoryImlp.getInstance()
  );
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

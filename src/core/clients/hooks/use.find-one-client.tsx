"use client";

import { useQuery } from "@tanstack/react-query";
import { findOneClientAction } from "../actions/find-one-client.action";

const useFindOneClient = (ccNumber: string, obtaintTickets = false) => {
  const findOneClientQuery = useQuery({
    queryKey: ["client", ccNumber],
    queryFn: () => findOneClientAction({ ccNumber, obtaintTickets }),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const executeQuery = () => {
    if (findOneClientQuery.isPending) return;
    findOneClientQuery.refetch();
  };

  return { findOneClientQuery, executeQuery };
};

export default useFindOneClient;

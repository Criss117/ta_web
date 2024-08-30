"use client";

import { useQuery } from "@tanstack/react-query";
import { findOneClientAction } from "../actions/find-one-client.action";
import { MutateClientReturnType } from "../modules/mutate-client/models/type";

async function findOneClient(
  ccNumber: string
): Promise<MutateClientReturnType> {
  const res = await findOneClientAction(ccNumber);

  return res;
}

const useFindOneClient = (ccNumber: string, enabled = true) => {
  const findOneClientQuery = useQuery({
    queryKey: ["client", ccNumber],
    queryFn: () => findOneClient(ccNumber),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const executeQuery = () => {
    if (findOneClientQuery.isPending) return;
    findOneClientQuery.refetch();
  };

  return { findOneClientQuery, executeQuery };
};

export default useFindOneClient;

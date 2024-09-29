"use client";

import { useQuery } from "@tanstack/react-query";
import { FindClientDto } from "../dto/find-client.dto";
import ClientUseCasesFactory from "../../composition-root/client-usecases.factory";

async function findByIdOrCcNumber(findBy: FindClientDto) {
  const findClientUseCase = ClientUseCasesFactory.createFindByIdOrCcNumber();

  return findClientUseCase.execute(findBy);
}

const useFindClient = (ccNumber: string, obtainTickets = false) => {
  const findOneClientQuery = useQuery({
    queryKey: ["client", ccNumber],
    queryFn: () => findByIdOrCcNumber({ ccNumber, obtainTickets }),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const executeQuery = () => {
    if (findOneClientQuery.isPending) return;
    findOneClientQuery.refetch();
  };

  return {
    error: findOneClientQuery.error,
    isError: findOneClientQuery.isError,
    isPending: findOneClientQuery.isPending,
    isSuccess: findOneClientQuery.isSuccess,
    data: findOneClientQuery.data?.data,
    findOneClientQuery,
    executeQuery,
  };
};

export default useFindClient;

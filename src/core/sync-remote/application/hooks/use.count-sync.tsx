"use client";

import { useQuery } from "@tanstack/react-query";
import SyncRemoteUseCasesFactory from "../../composition-root/sync-remote-usecases.factory";

async function countSyncAction() {
  const countSyncUseCase = SyncRemoteUseCasesFactory.createCountSyncRemote();

  return countSyncUseCase.execute();
}

const useCountSync = () => {
  const countSyncQuery = useQuery({
    queryKey: ["count-sync"],
    queryFn: countSyncAction,
    refetchInterval: 1000 * 60, // 1 minute
  });

  return {
    error: countSyncQuery.error,
    isError: countSyncQuery.isError,
    isSuccess: countSyncQuery.isSuccess,
    isPending: countSyncQuery.isPending,
    isFetching: countSyncQuery.isFetching,
    data: countSyncQuery.data?.data,
    countSyncQuery,
  };
};

export default useCountSync;

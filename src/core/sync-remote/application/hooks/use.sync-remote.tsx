/** @format */

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import SyncRemoteUseCasesFactory from "../../composition-root/sync-remote-usecases.factory";
import { toast } from "@/components/ui/use-toast";
import { axiosInstance } from "@/core/common/lib/networking";

async function syncRemote() {
  const syncRemoteUseCase = SyncRemoteUseCasesFactory.createSyncRemote();

  return syncRemoteUseCase.execute();
}

const useSyncRemote = () => {
  const queryClient = useQueryClient();

  const syncRemoteMutation = useMutation({
    mutationFn: syncRemote,
    onSuccess: (response) => {
      if (response.error) {
        toast({
          title: "Error",
          description: response.error,
          variant: "destructive",
        });

        return;
      }

      queryClient.refetchQueries({
        queryKey: ["count-sync"],
      });

      toast({
        title: "Sincronización exitosa",
        description: "Se ha sincronizado correctamente",
      });
    },
  });

  const synchronize = async () => {
    syncRemoteMutation.mutate();
  };

  return {
    isPending: syncRemoteMutation.isPending,
    syncRemoteMutation,
    synchronize,
  };
};

export default useSyncRemote;

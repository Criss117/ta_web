"use client";

import { useMutation } from "@tanstack/react-query";
import SyncRemoteUseCasesFactory from "../../composition-root/sync-remote-usecases.factory";
import { toast } from "@/components/ui/use-toast";

async function syncRemote() {
  const syncRemoteUseCase = SyncRemoteUseCasesFactory.createSyncRemote();

  return syncRemoteUseCase.execute();
}

const useSyncRemote = () => {
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

      toast({
        title: "Sincronización exitosa",
        description: "Se ha sincronizado correctamente",
      });
    },
  });

  const synchronize = () => {
    syncRemoteMutation.mutate();
  };

  return {
    isPending: syncRemoteMutation.isPending,
    syncRemoteMutation,
    synchronize,
  };
};

export default useSyncRemote;

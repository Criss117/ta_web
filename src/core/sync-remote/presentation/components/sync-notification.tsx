"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useCountSync from "../../application/hooks/use.count-sync";
import useSyncRemote from "../../application/hooks/use.sync-remote";
import { cn } from "@/lib/utils";

const SyncNotification = () => {
  const { data } = useCountSync();
  const { synchronize, isPending } = useSyncRemote();

  if (data === 0) {
    return <Button disabled>Datos sincronizados</Button>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={synchronize}
            className="relative"
            disabled={isPending}
          >
            <Loader2
              className={cn(
                "w-8 h-8 text-black animate-spin absolute -left-8",
                !isPending ? "hidden" : ""
              )}
            />
            <p>Sincronizar {data || "..."} cambios</p>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Sincroniza tus cambios con el servidor</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SyncNotification;

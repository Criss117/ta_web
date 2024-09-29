"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

import type ClientPay from "@Core/clients/application/dto/client-pay.dto";
import useClientsTable from "@Core/clients/application/hooks/use.clients-table";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Props {
  onSearch?: () => void;
  setClient: (client: ClientPay) => void;
}

const ClientList = ({ setClient, onSearch }: Props) => {
  const [clientPay, setClientPay] = useState<ClientPay | undefined>();
  const [query, setQuery] = useState<string | undefined>();
  const queryDebaunce = useDebounce(query, 500);

  const { data, refetch } = useClientsTable({
    offset: 50,
    filters: { query: queryDebaunce },
  });

  useEffect(() => {
    if (!queryDebaunce) return;
    if (queryDebaunce.length >= 3 || queryDebaunce.length === 0) {
      onSearch?.();
      refetch();
    }
  }, [queryDebaunce]);

  const onClick = (client: ClientPay) => {
    setClient(client);
    setClientPay(client);
  };

  return (
    <div className="flex justify-center mt-5 flex-col items-center gap-y-2 w-[80%] mx-auto">
      <Input
        value={query || ""}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full"
      />
      <ScrollArea className="h-40 w-full border border-black">
        <ul className="space-y-2 mt-2">
          {data?.items?.map((client, index) => (
            <li
              key={client.id}
              className={cn(
                "flex gap-x-5 justify-between px-3 hover:cursor-pointer hover:bg-lightbg-300 transition-all",
                index % 2 === 0 && "bg-lightbg-300/50",
                clientPay?.id === client.id &&
                  "bg-lightprimary-300 hover:bg-lightprimary-300/90 text-white"
              )}
              onClick={() => onClick(client)}
            >
              <p className="text-center">{client.ccNumber}</p>
              <p className="text-center">{client.fullName}</p>
            </li>
          ))}
          {!data?.items?.length && (
            <p className="text-center">No hay resultados</p>
          )}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default ClientList;

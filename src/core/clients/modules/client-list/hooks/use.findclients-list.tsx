"use client";

import useFindClients from "@/core/clients/hooks/use.find-clients";
import { useMemo } from "react";
import { ClientsToPayAdapter } from "../adapter/clients-to-pay.adapter";
interface Props {
  query?: string;
}

const useFindClientsList = ({ query }: Props) => {
  const findClientsPayQuery = useFindClients({
    filters: { query },
    queryKey: ["clients-pay", query || "all"],
    enabled: true,
  });

  const clients = useMemo(() => {
    return ClientsToPayAdapter.adapt(findClientsPayQuery.data?.data);
  }, [findClientsPayQuery.data?.data]);

  return { clients, findClientsPayQuery };
};

export default useFindClientsList;

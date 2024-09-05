"use client";
import { useEffect, useState } from "react";

import { formatCurrency } from "@/lib/utils";
import ActionsNav from "./components/actions-nav";
import BackButton from "@/components/ui/back-button";
import type { ClientAndTickets } from "../../models/types";
import useFindOneClient from "../../hooks/use.find-one-client";
import ManageClientSkeleton from "./components/manage-client-skeleton";
import TicketListContainer from "@/core/tickets/modules/tickets-list/tickets-list.container";

interface Props {
  ccNumber: string;
}

const ManageClientContainer = ({ ccNumber }: Props) => {
  const [client, setClient] = useState<ClientAndTickets | undefined | null>();
  const { findOneClientQuery } = useFindOneClient(ccNumber, true);

  useEffect(() => {
    setClient(findOneClientQuery.data?.data);
  }, [findOneClientQuery.data]);

  if (findOneClientQuery.isPending || !client) {
    return <ManageClientSkeleton />;
  }

  return (
    <section className="w-full px-10 flex-grow flex flex-col">
      <header className="mt-5 relative">
        <BackButton className="absolute -translate-y-1/2 top-1/2 m-0" />
        <div className="flex mx-auto justify-between w-[70%]">
          <p className="text-xl">
            Saldo Actual:{" "}
            <span className="font-bold text-3xl">
              {formatCurrency(client?.balance || 0)}
            </span>
          </p>
          <p className="text-xl">
            Límite de crédito:{" "}
            <span className="font-bold text-3xl">
              {formatCurrency(client?.creditLimit || 0)}
            </span>{" "}
          </p>
        </div>
      </header>
      <ActionsNav clientId={client.id || -1} />
      <TicketListContainer
        tickets={client?.tickets || []}
        ccNumber={ccNumber}
      />
    </section>
  );
};

export default ManageClientContainer;

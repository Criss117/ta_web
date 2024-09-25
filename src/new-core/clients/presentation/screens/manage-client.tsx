"use client";

import BackButton from "@/components/ui/back-button";
import useFindClient from "../../application/hooks/use.find-client";
import ManageClientSkeleton from "../components/manage-client/manage-client-skeleton";
import { formatCurrency } from "@/lib/utils";
import ActionsNav from "../components/manage-client/actions-nav";
import TicketsProductsList from "@Core/tickets/presentation/components/tickets-list/tickets-products-list";

interface Props {
  ccNumber: string;
}

const ManageClient = ({ ccNumber }: Props) => {
  const { findOneClientQuery } = useFindClient(ccNumber, true);

  if (findOneClientQuery.isPending) {
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
              {formatCurrency(findOneClientQuery.data?.balance || 0)}
            </span>
          </p>
          <p className="text-xl">
            Límite de crédito:{" "}
            <span className="font-bold text-3xl">
              {formatCurrency(findOneClientQuery.data?.creditLimit || 0)}
            </span>{" "}
          </p>
        </div>
      </header>
      <ActionsNav clientId={findOneClientQuery.data?.id} />
      <TicketsProductsList
        ccNumber={ccNumber}
        clientId={findOneClientQuery.data?.id || -1}
        tickets={findOneClientQuery.data?.tickets || []}
      />
    </section>
  );
};

export default ManageClient;

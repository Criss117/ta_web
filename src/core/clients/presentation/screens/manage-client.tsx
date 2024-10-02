"use client";

import React from "react";

import BackButton from "@/components/ui/back-button";
import useFindClient from "../../application/hooks/use.find-client";
import ManageClientSkeleton from "../components/manage-client/manage-client-skeleton";
import { formatCurrency } from "@/lib/utils";
import ActionsNav from "../components/manage-client/actions-nav";
import TicketsProductsList from "@Core/tickets/presentation/components/tickets-list/tickets-products-list";
import SectionHeader from "@/components/ui/section-header";
import { TITLES } from "@/lib/constants/metadata";

interface Props {
  ccNumber: string;
}

const ManageClient = ({ ccNumber }: Props) => {
  const { data, isPending } = useFindClient(ccNumber, true);

  if (isPending || !data) {
    return <ManageClientSkeleton />;
  }

  return (
    <>
      <SectionHeader title={TITLES.MANAGE_CLIENT + ": " + data?.fullName} />
      <section className="w-full px-10 flex-grow flex flex-col">
        <header className="mt-5 relative">
          <BackButton className="absolute -translate-y-1/2 top-1/2 m-0" />
          <div className="flex mx-auto justify-between w-[70%]">
            <p className="text-xl">
              Saldo Actual:{" "}
              <span className="font-bold text-3xl">
                {formatCurrency(data?.balance || 0)}
              </span>
            </p>
            <p className="text-xl">
              Límite de crédito:{" "}
              <span className="font-bold text-3xl">
                {formatCurrency(data?.creditLimit || 0)}
              </span>{" "}
            </p>
          </div>
        </header>
        <ActionsNav client={data} />
        <TicketsProductsList
          ccNumber={ccNumber}
          clientId={data?.id || ""}
          tickets={data?.tickets || []}
        />
      </section>
    </>
  );
};

export default ManageClient;

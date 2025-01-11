"use client";

import BackButton from "@/components/ui/back-button";
import SectionHeader from "@/components/ui/section-header";
import useFindClient from "@/core/clients/application/hooks/use.find-client";
import { TITLES } from "@/lib/constants/metadata";
import { formatCurrency } from "@/lib/utils";
import ActionsNav from "./actions-nav";
import ManageClientSkeleton from "./manage-client-skeleton";

interface Props {
  children: React.ReactNode;
  ccNumber: string;
}

const ManageClientLayout = ({ ccNumber, children }: Props) => {
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
        {data && <ActionsNav client={data} />}
        {children}
      </section>
    </>
  );
};

export default ManageClientLayout;

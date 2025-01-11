"use client";

import { useFindClientReport } from "@/core/reports/client/application/hooks/use.find-client-report";
import { ClientReportTable } from "../components/client-report-table";
import SectionHeader from "@/components/ui/section-header";
import { TITLES } from "@/lib/constants/metadata";
import { formatCurrency } from "@/lib/utils";
import BackButton from "@/components/ui/back-button";
import ActionsNav from "@/core/clients/presentation/components/manage-client/actions-nav";

interface Props {
  ccnumber: string;
}

const ClientReportScreen = ({ ccnumber }: Props) => {
  const { data, isFetching } = useFindClientReport(ccnumber);

  return (
    <ClientReportTable
      allDebts={data?.allDebts || []}
      allTickets={data?.allTickets || []}
      isFetching={isFetching}
    />
  );
};

export default ClientReportScreen;

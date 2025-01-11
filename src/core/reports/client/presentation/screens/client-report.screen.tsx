"use client";

import { useFindClientReport } from "../../application/hooks/use.find-client-report";
import {
  ClientReportTable,
  ClientReportTableError,
  ClientReportTableLoading,
} from "../components/client-report-table";

interface Props {
  ccnumber: string;
}

const ClientReportScreen = ({ ccnumber }: Props) => {
  const { data, isError, isFetching } = useFindClientReport(ccnumber);

  if (isError) return <ClientReportTableError />;

  return (
    <ClientReportTable
      allDebts={data?.allDebts || []}
      allTickets={data?.allTickets || []}
      isFetching={isFetching}
    />
  );
};

export default ClientReportScreen;

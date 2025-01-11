import ClientReportScreen from "@/core/reports/client/presentation/screens/client-report.screen";

interface Props {
  params: Promise<{
    ccnumber: string;
  }>;
}

const ClientReportPage = async ({ params }: Props) => {
  const ccnumber = (await params).ccnumber;

  return <ClientReportScreen ccnumber={ccnumber} />;
};

export default ClientReportPage;

import ManageClientLayout from "@/core/clients/presentation/components/manage-client/manage-client-layout";

interface Props {
  children: React.ReactNode;
  params: Promise<{
    ccnumber: string;
  }>;
}

const ClientLayout = async ({ children, params }: Props) => {
  const paramsData = await params;

  return (
    <ManageClientLayout ccNumber={paramsData.ccnumber}>
      {children}
    </ManageClientLayout>
  );
};

export default ClientLayout;

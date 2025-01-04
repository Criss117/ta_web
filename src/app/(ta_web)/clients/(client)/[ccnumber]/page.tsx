import ManageClient from "@Core/clients/presentation/screens/manage-client";

interface Props {
  params: Promise<{
    ccnumber: string;
  }>;
}
const ClientPage = async (props: Props) => {
  const params = await props.params;
  const { ccnumber } = params;

  return <ManageClient ccNumber={ccnumber} />;
};

export default ClientPage;

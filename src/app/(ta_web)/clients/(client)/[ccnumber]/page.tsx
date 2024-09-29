import ManageClient from "@Core/clients/presentation/screens/manage-client";

interface Props {
  params: {
    ccnumber: string;
  };
}
const ClientPage = ({ params }: Props) => {
  const { ccnumber } = params;

  return <ManageClient ccNumber={ccnumber} />;
};

export default ClientPage;

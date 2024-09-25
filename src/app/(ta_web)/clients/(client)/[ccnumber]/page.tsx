import ManageClientContainer from "@/core/clients/modules/manage-client/manage-client.container";
import ManageClient from "@/new-core/clients/presentation/screens/manage-client";

interface Props {
  params: {
    ccnumber: string;
  };
}
const ClientPage = ({ params }: Props) => {
  const { ccnumber } = params;
  // return <ManageClientContainer ccNumber={ccnumber} />;
  return <ManageClient ccNumber={ccnumber} />;
};

export default ClientPage;

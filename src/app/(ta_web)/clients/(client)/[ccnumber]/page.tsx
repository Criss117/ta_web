import ManageClientContainer from "@/core/clients/modules/manage-client/manage-client.container";

interface Props {
  params: {
    ccnumber: string;
  };
}
const ClientPage = ({ params }: Props) => {
  const { ccnumber } = params;
  return <ManageClientContainer ccNumber={ccnumber} />;
};

export default ClientPage;

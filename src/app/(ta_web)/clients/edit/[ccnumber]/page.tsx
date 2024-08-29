import EditClientContainer from "@/core/clients/modules/mutate-client/modules/edit-client/edit-client.container";

interface Props {
  params: {
    ccnumber: string;
  };
}

const EditClientPage = ({ params }: Props) => {
  const { ccnumber } = params;

  const ccnumberDecode = decodeURIComponent(ccnumber);

  return <EditClientContainer ccNumber={ccnumberDecode} />;
};

export default EditClientPage;

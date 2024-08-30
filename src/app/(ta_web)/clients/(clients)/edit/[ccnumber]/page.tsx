import MutateClientContainer from "@/core/clients/modules/mutate-client/mutate-client.container";

interface Props {
  params: {
    ccnumber: string;
  };
}

const EditClientPage = ({ params }: Props) => {
  const { ccnumber } = params;

  const ccnumberDecode = decodeURIComponent(ccnumber);

  return <MutateClientContainer ccNumber={ccnumberDecode} action="edit" />;
};

export default EditClientPage;

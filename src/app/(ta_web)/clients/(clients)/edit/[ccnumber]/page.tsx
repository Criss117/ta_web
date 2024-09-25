import MutateClientContainer from "@/core/clients/modules/mutate-client/mutate-client.container";
import EditClientScreen from "@Core/clients/presentation/screens/edit-client.screen";

interface Props {
  params: {
    ccnumber: string;
  };
}

const EditClientPage = ({ params }: Props) => {
  const { ccnumber } = params;

  const ccnumberDecode = decodeURIComponent(ccnumber);

  // return <MutateClientContainer ccNumber={ccnumberDecode} action="edit" />;

  return <EditClientScreen ccNumber={ccnumberDecode} />;
};

export default EditClientPage;

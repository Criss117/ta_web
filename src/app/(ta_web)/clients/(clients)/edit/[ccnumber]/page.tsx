import EditClientScreen from "@Core/clients/presentation/screens/edit-client.screen";

interface Props {
  params: {
    ccnumber: string;
  };
}

const EditClientPage = ({ params }: Props) => {
  const { ccnumber } = params;

  const ccnumberDecode = decodeURIComponent(ccnumber);

  return <EditClientScreen ccNumber={ccnumberDecode} />;
};

export default EditClientPage;

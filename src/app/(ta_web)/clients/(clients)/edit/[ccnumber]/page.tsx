import EditClientScreen from "@Core/clients/presentation/screens/edit-client.screen";

interface Props {
  params: Promise<{
    ccnumber: string;
  }>;
}

const EditClientPage = async (props: Props) => {
  const params = await props.params;
  const { ccnumber } = params;

  const ccnumberDecode = decodeURIComponent(ccnumber);

  return <EditClientScreen ccNumber={ccnumberDecode} />;
};

export default EditClientPage;

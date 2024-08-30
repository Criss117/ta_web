interface Props {
  params: {
    ccnumber: string;
  };
}
const ClientPage = ({ params }: Props) => {
  const { ccnumber } = params;
  return <div>{ccnumber}</div>;
};

export default ClientPage;

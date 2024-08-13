interface Props {
  page: number;
  offset: number;
}

const ClientsContainer = ({ page, offset }: Props) => {
  return <div className="border mt-10 mx-5 py-10 rounded-xl"></div>;
};

export default ClientsContainer;

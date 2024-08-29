import CreateClientContainer from "./modules/create-client/create-client.container";

interface Props {
  id?: number;
  barcode?: string;
  action: "create" | "edit" | "delete";
}

const MutateClientContainer = ({ action, barcode, id }: Props) => {
  if (action === "create") {
    return <CreateClientContainer />;
  }

  return null;
};

export default MutateClientContainer;

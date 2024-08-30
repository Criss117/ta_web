import CreateClientContainer from "./modules/create-client/create-client.container";
import DeleteClientContainer from "./modules/delete-client/delete-client.container";
import EditClientContainer from "./modules/edit-client/edit-client.container";

interface Props {
  id?: number;
  ccNumber?: string;
  action: "create" | "edit" | "delete";
}

const MutateClientContainer = ({ action, ccNumber, id }: Props) => {
  if (action === "create") {
    return <CreateClientContainer />;
  }

  if (ccNumber && action === "edit") {
    return <EditClientContainer ccNumber={ccNumber} />;
  }

  if (ccNumber && action === "delete" && id) {
    return <DeleteClientContainer ccNumber={ccNumber} id={id} />;
  }

  return null;
};

export default MutateClientContainer;

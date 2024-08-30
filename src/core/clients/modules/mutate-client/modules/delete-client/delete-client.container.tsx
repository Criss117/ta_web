"use client";

import DeleteAlertDialog from "@/components/delete-alert-dialog";
import useDeleteClient from "./hooks/use.delete-client";

interface Props {
  id: number;
  ccNumber: string;
}

const DeleteClientContainer = ({ id, ccNumber }: Props) => {
  const { deleteClientMutation, mutate } = useDeleteClient();

  const handleClick = () => {
    mutate({ id, ccNumber });
  };

  return (
    <DeleteAlertDialog
      title="Está seguro de eliminar este cliente?"
      description={() => (
        <span className="flex flex-col">
          El cliente con el Código de Identificación {ccNumber} sera eliminado.
          <span>Esta operación no se puede deshacer.</span>
        </span>
      )}
      handleClick={handleClick}
      isSuccess={deleteClientMutation.isSuccess}
      isPending={deleteClientMutation.isPending}
    />
  );
};

export default DeleteClientContainer;

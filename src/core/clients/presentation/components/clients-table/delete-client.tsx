"use client";

import useDeleteClient from "@Core/clients/application/hooks/use.delete-client";
import DeleteAlertDialog from "@Core/common/components/delete-alert-dialog";

interface Props {
  id: number;
  ccNumber: string;
}

const DeleteClient = ({ id, ccNumber }: Props) => {
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
      isSuccess={deleteClientMutation.isSuccess}
      isPending={deleteClientMutation.isPending}
      handleClick={handleClick}
    />
  );
};

export default DeleteClient;

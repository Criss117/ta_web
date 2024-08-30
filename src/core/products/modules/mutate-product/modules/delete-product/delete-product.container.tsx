"use client";

import useDeleteProduct from "./hooks/use.delete-product";
import DeleteAlertDialog from "@/components/delete-alert-dialog";

interface Props {
  id: number;
  barcode: string;
}

const DeleteProductContainer = ({ id, barcode }: Props) => {
  const { deleteProductMutation, mutate } = useDeleteProduct();

  const handleClick = () => {
    mutate({ barcode, id });
  };

  return (
    <DeleteAlertDialog
      title="Está seguro de eliminar este producto?"
      description={() => (
        <span className="flex flex-col">
          El producto con el Código de Barras {barcode} sera eliminado.
          <span>Esta operación no se puede deshacer.</span>
        </span>
      )}
      handleClick={handleClick}
      isSuccess={deleteProductMutation.isSuccess}
      isPending={deleteProductMutation.isPending}
    />
  );
};

export default DeleteProductContainer;

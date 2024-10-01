"use client";

import useDeleteProduct from "@Core/products/application/hooks/use.delete-product";
import DeleteAlertDialog from "@Core/common/components/delete-alert-dialog";

interface Props {
  id: string;
}

const DeleteProduct = ({ id }: Props) => {
  const { isPending, isSuccess, mutate } = useDeleteProduct();

  const handleClick = () => {
    mutate(id);
  };

  return (
    <DeleteAlertDialog
      title="Está seguro de eliminar este producto?"
      description={() => (
        <span className="flex flex-col">
          El producto con el Código de Identificación {id} sera eliminado.
          <span>Esta operación no se puede deshacer.</span>
        </span>
      )}
      isSuccess={isSuccess}
      isPending={isPending}
      handleClick={handleClick}
    />
  );
};

export default DeleteProduct;

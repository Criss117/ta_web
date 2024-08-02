"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useDeleteProduct from "./hooks/use.delete-product";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  id: number;
  barcode: string;
}

const DeleteProductContainer = ({ id, barcode }: Props) => {
  const { deleteProductMutation, mutate } = useDeleteProduct();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    mutate({ barcode, id });
  };

  useEffect(() => {
    if (deleteProductMutation.isSuccess) {
      setIsOpen(false);
    }
  }, [deleteProductMutation.isSuccess]);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger>
        <Button variant="destructive" asChild>
          <p>Eliminar</p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Está seguro de eliminar este producto?
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span className="flex flex-col">
              El producto con el Código de Barras {barcode} sera eliminado.
              <span>Esta operación no se puede deshacer.</span>
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="w-1/2"
            disabled={deleteProductMutation.isPending}
          >
            Cancelar
          </AlertDialogCancel>
          <Button
            disabled={deleteProductMutation.isPending}
            className="w-1/2"
            onClick={handleClick}
          >
            {deleteProductMutation.isPending ? (
              <Loader className="h-5 w-5 animate-spin" />
            ) : (
              "Eliminar"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProductContainer;

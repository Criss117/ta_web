"use client";

import { useEffect, useState } from "react";
import { Loader } from "lucide-react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

interface Props {
  isSuccess: boolean;
  isPending: boolean;
  title: string;
  description: () => JSX.Element | string | null;
  handleClick: () => void;
}

const DeleteAlertDialog = ({
  title,
  isSuccess,
  isPending,
  description,
  handleClick,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess]);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger onClick={(e) => e.stopPropagation()}>
        <Button variant="destructive" asChild>
          <p>Eliminar</p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {typeof description === "string" ? description : description()}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="w-1/2"
            disabled={isPending}
            onClick={(e) => e.stopPropagation()}
          >
            Cancelar
          </AlertDialogCancel>
          <Button
            disabled={isPending}
            className="w-1/2"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            {isPending ? (
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

export default DeleteAlertDialog;

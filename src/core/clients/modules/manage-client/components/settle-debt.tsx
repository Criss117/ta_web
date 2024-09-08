"use client";

import { useEffect, useState } from "react";
import { CreditCard, Loader } from "lucide-react";

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
import useSettleDebt from "@/core/clients/hooks/use.settle-debt";

interface Props {
  clientId: number;
}

const SettleDebt = ({ clientId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isPending, isSuccess, settleDebt } = useSettleDebt();

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess]);

  const handleClick = () => {
    settleDebt(clientId);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger onClick={(e) => e.stopPropagation()} asChild>
        <Button variant="outline" className="space-x-2">
          <CreditCard />
          <p>Liquidar Adeudo</p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Liquidar Adeudo</AlertDialogTitle>
          <AlertDialogDescription>
            Está seguro de liquidar el adeudo?{" "}
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
              "Liquidar Adeudo"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SettleDebt;

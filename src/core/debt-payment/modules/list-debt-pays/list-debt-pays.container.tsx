"use client";
import { useEffect, useState } from "react";
import { ReceiptText } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useFindDebtPayments from "../../hooks/use.find-debt-payments";
import DebtPaymentsTable from "./components/debt-payments-table";
import type { DeleteDebtPaymentInputType } from "../../models/type";
import { useDeleteDebtPayment } from "../../hooks/use.debt-payments.mutation";

interface Props {
  clientId: number;
  disabled?: boolean;
}

const ListDebtPaysContainer = ({ clientId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [debtPayment, setDebtPayment] =
    useState<DeleteDebtPaymentInputType | null>(null);
  const { data, onFindDebtPaymets } = useFindDebtPayments({
    clientId,
  });
  const { deleteMutation, mutate } = useDeleteDebtPayment({
    clientId: debtPayment?.clientId || -1,
    id: debtPayment?.id || -1,
  });

  useEffect(() => {
    if (isOpen) {
      onFindDebtPaymets();
    }

    if (!isOpen) {
      setDebtPayment(null);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      setDebtPayment(null);
    };
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="space-x-2 ">
          <ReceiptText />
          <p>Detalle de abonos</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[600px] h-[600px] flex flex-col">
        <DialogHeader className=" h-[10%] items-center">
          <DialogTitle>Detalle de abonos</DialogTitle>
          <DialogDescription>Lista de abonos</DialogDescription>
        </DialogHeader>
        {data && (
          <DebtPaymentsTable
            data={data}
            debtPayment={debtPayment}
            setDebtPayment={setDebtPayment}
          />
        )}
        <DialogFooter className="h-[10%] flex sm:justify-between">
          <Button
            variant={debtPayment === null ? "outline" : "destructive"}
            disabled={debtPayment === null || deleteMutation.isPending}
            onClick={mutate}
          >
            Eliminar
          </Button>
          <Button onClick={() => setIsOpen(false)}>Cancelar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ListDebtPaysContainer;

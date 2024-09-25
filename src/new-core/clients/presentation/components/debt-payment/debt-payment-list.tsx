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

import useFindDebtPays from "@Core/clients/application/hooks/use.find-debt-pays";
import DebtPaymentSummaryDto from "@Core/clients/application/dto/debt-payment-summary.dto";
import useDeleteDebtPay from "@Core/clients/application/hooks/use.delete-debt-pay";

import DebtPaymentTable from "./debt-payment-table";

interface Props {
  clientId: number;
}

const DebtPaymentList = ({ clientId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDebtPay, setSelectedDebtPay] =
    useState<DebtPaymentSummaryDto | null>(null);

  const { findDebtPaysQuery, onFindDebtPays } = useFindDebtPays(clientId);
  const { deleteDebtPayMutation, mutate } = useDeleteDebtPay({
    clientId: selectedDebtPay?.clientId || -1,
    id: selectedDebtPay?.id || -1,
  });

  useEffect(() => {
    if (isOpen) {
      onFindDebtPays();
    }

    if (!isOpen) {
      setSelectedDebtPay(null);
    }

    return () => {
      setSelectedDebtPay(null);
    };
  }, [isOpen]);

  useEffect(() => {
    if (deleteDebtPayMutation.isSuccess) {
      setSelectedDebtPay(null);
    }
  }, [deleteDebtPayMutation.isSuccess]);

  const handleClick = () => {
    if (!selectedDebtPay) return;
    mutate();
  };

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
        <DebtPaymentTable
          data={findDebtPaysQuery.data || []}
          selectedDebtPayment={selectedDebtPay}
          setSelectedDebtPayment={setSelectedDebtPay}
        />
        <DialogFooter className="h-[10%] flex sm:justify-between">
          <Button
            variant={selectedDebtPay === null ? "outline" : "destructive"}
            disabled={
              selectedDebtPay === null || deleteDebtPayMutation.isPending
            }
            onClick={handleClick}
          >
            Eliminar
          </Button>
          <Button onClick={() => setIsOpen(false)}>Cancelar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DebtPaymentList;

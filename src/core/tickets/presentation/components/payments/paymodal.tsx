"use client";

import { useEffect, useState } from "react";
import { CircleDollarSign, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/utils";
import TicketToSaleEntity from "@Core/tickets/domain/entities/ticket-to-sale.entity";
import ClientList from "@Core/clients/presentation/components/clients-table/client-list";
import ClientPay from "@Core/clients/application/dto/client-pay.dto";
import usePaymentState from "@Core/tickets/application/state/payment.state";

import CashPayment from "./cash-payment";
import PayModalActions from "./paymodal-actions";

interface Props {
  currentTicket: TicketToSaleEntity;
}

const PayModal = ({ currentTicket }: Props) => {
  const [ticket, setTicket] = useState(currentTicket);
  const { inProgress, isCredit, setIsCredit, setInProgress } =
    usePaymentState();

  const onSetClient = (client: ClientPay) => {
    setTicket((prev) => ({
      ...prev,
      clientId: client.id,
      ccNumber: client.ccNumber,
      clientName: client.fullName,
    }));
  };

  const onSearch = () => {
    setTicket((prev) => ({
      ...prev,
      ccNumber: undefined,
      clientId: undefined,
      clientName: "Seleccione un cliente",
    }));
  };

  const handlerCredit = (isCredit: boolean) => {
    setIsCredit(isCredit);
    setTicket((prev) => ({
      ...prev,
      ccNumber: undefined,
      clientId: undefined,
      clientName: isCredit ? "Seleccione un cliente" : "Pago en Efectivo",
    }));
  };

  return (
    <Dialog open={inProgress} onOpenChange={setInProgress}>
      <DialogTrigger>
        <Button variant="default" className="h-20 w-52" asChild>
          <p>Cobrar</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl h-[70%] flex flex-col">
        <DialogHeader className="h-fit bg-lightbg-300 p-2 mt-5">
          <DialogTitle>
            Cobrar: {ticket.clientName || "Pago en Efectivo"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex h-full">
          <div className="bg-lightbg-100 w-2/3 h-full">
            <header className="flex flex-col items-center gap-y-5">
              <h3 className="text-2xl">Total a cobrar</h3>
              <p className="text-5xl font-bold">
                {formatCurrency(ticket.total)}
              </p>
            </header>

            <ul className="flex items-center justify-center gap-x-20 mt-10">
              <li>
                <Button
                  className="flex flex-col h-20"
                  variant={!isCredit ? "default" : "outline"}
                  onClick={() => handlerCredit(false)}
                >
                  <CircleDollarSign size={50} />
                  <span>Efectivo</span>
                </Button>
              </li>
              <li>
                <Button
                  className="flex flex-col h-20"
                  variant={isCredit ? "default" : "outline"}
                  onClick={() => handlerCredit(true)}
                >
                  <User size={50} />
                  <span>Crédito</span>
                </Button>
              </li>
            </ul>
            {!isCredit && <CashPayment total={ticket.total} />}
            {isCredit && (
              <ClientList setClient={onSetClient} onSearch={onSearch} />
            )}
          </div>
          <div className="bg-lightprimary-200 w-1/3 h-full space-y-5 p-2">
            <PayModalActions isCredit={isCredit} ticket={ticket} />
            <Button
              className="w-full"
              variant="destructive"
              onClick={() => setInProgress(false)}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PayModal;

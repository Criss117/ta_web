"use client";

import { useEffect, useMemo } from "react";
import { CircleDollarSign, Loader, Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

import { usePaymentState } from "../state/payment.state";
import { formatCurrency } from "@/lib/utils";
import { TicketStateEnum } from "../models/enum";
import usePay from "../hooks/use.payment";
import Change from "./change";
import ClientListContainer from "@/core/clients/modules/client-list/client-list.container";
import LoaderComponent from "@/components/ui/loader-component";

const PayModal = () => {
  const { client, total, products, ticketState, setTicketState, setClient } =
    usePaymentState();

  const isCredit = useMemo(
    () => ticketState === TicketStateEnum.PENDING,
    [ticketState]
  );

  const { payMutation, isOpen, onMutate, setIsOpen } = usePay({
    products,
    client,
    ticket: { state: ticketState, total },
  });

  const handleClick = () => {
    if (ticketState === TicketStateEnum.PENDING && !client) {
      toast({
        variant: "destructive",
        title: "Cobrar",
        description: "Debe seleccionar un cliente",
      });
      return;
    }
    onMutate();
  };

  useEffect(() => {
    if (!isOpen) {
      setTicketState(TicketStateEnum.PAID);
      setClient(undefined);
    }
  }, [isOpen]);

  useEffect(() => {
    if (ticketState === TicketStateEnum.PAID) {
      setClient(undefined);
    }
  }, [ticketState]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button variant="default" className="h-20 w-52" asChild>
          <p>Cobrar</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl h-[70%] flex flex-col">
        <DialogHeader className="h-fit bg-lightbg-300 p-2 mt-5">
          <DialogTitle>Cobrar</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex h-full">
          <div className="bg-lightbg-100 w-2/3 h-full">
            <header className="flex flex-col items-center gap-y-5">
              <h3 className="text-2xl">Total a cobrar</h3>
              <p className="text-5xl font-bold">{formatCurrency(total)}</p>
            </header>

            <ul className="flex items-center justify-center gap-x-20 mt-10">
              <li>
                <Button
                  className="flex flex-col h-20"
                  variant={!isCredit ? "default" : "outline"}
                  onClick={() => setTicketState(TicketStateEnum.PAID)}
                >
                  <CircleDollarSign size={50} />
                  <span>Efectivo</span>
                </Button>
              </li>
              <li>
                <Button
                  className="flex flex-col h-20"
                  variant={isCredit ? "default" : "outline"}
                  onClick={() => setTicketState(TicketStateEnum.PENDING)}
                >
                  <User size={50} />
                  <span>Crédito</span>
                </Button>
              </li>
            </ul>

            {!isCredit && <Change total={total} />}
            {isCredit && <ClientListContainer setClient={setClient} />}
          </div>
          <div className="bg-lightprimary-200 w-1/3 h-full space-y-5 p-2">
            <Button
              className="w-full"
              onClick={handleClick}
              disabled={payMutation.isPending}
            >
              <LoaderComponent
                title="Cobrar e imprimir Ticket"
                isLoading={payMutation.isPending}
              />
            </Button>
            <Button
              className="w-full"
              onClick={handleClick}
              disabled={payMutation.isPending}
            >
              <LoaderComponent
                title="Cobrar solo registrando la venta"
                isLoading={payMutation.isPending}
              />
            </Button>
            <Button
              className="w-full"
              variant="destructive"
              onClick={() => setIsOpen(false)}
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

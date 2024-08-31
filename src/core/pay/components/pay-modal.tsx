"use client";

import { useMemo, useState } from "react";
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
import { usePayState } from "../state/pay.state";
import { formatCurrency } from "@/lib/utils";
import type { TicketState } from "../models/types";
import { TicketStateEnum } from "../models/enum";
import usePay from "../hooks/use.pay";
import Change from "./change";

const PayModal = () => {
  const { total, products } = usePayState();
  const [isOpen, setIsOpen] = useState(false);
  const [ticketState, setTicketState] = useState<TicketState>(
    TicketStateEnum.PAID
  );
  const isCredit = useMemo(
    () => ticketState === TicketStateEnum.PENDING,
    [ticketState]
  );

  const { onMutate } = usePay({
    products,
    ticket: { state: ticketState, total },
  });

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
          </div>
          <div className="bg-lightprimary-200 w-1/3 h-full space-y-5 p-2">
            <Button className="w-full" onClick={onMutate}>
              Cobrar e imprimir Ticket
            </Button>
            <Button className="w-full" onClick={onMutate}>
              Cobrar solo registrando la venta
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

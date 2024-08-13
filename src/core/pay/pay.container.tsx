"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { usePayState } from "./state/pay.state";

import { Ticket } from "../products/sales/models/type";
import { ProductTicketToPayAdapter } from "./adapters/product-ticket-to-pay.adapter";
import { formatCurrency } from "@/lib/utils";

interface Props {
  currentTicketId: number;
  tickets: Ticket[];
}

function PayContainer({ currentTicketId, tickets }: Props) {
  const { total, setInitialState } = usePayState();

  useEffect(() => {
    const dataAdapted = ProductTicketToPayAdapter.adapt(
      tickets.find((t) => t.id === currentTicketId) || null
    );

    setInitialState(dataAdapted);
  }, [tickets, currentTicketId]);

  return (
    <div className="fixed bottom-0 w-full bg-lightbg-300 h-32 py-2 px-10 flex">
      <div className="h-full flex items-center w-1/2">
        <Button variant="default" className="w-52 my-auto">
          Ventas del día
        </Button>
      </div>
      <div className="h-full flex items-center  w-1/2">
        <div className="w-1/2 flex justify-end">
          <Button variant="default" className="h-20 w-52">
            Pagar
          </Button>
        </div>
        <Separator orientation="vertical" className="mx-5" />
        <div className="w-1/2">
          <h3 className="text-4xl font-bold text-center">
            {formatCurrency(total)}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default PayContainer;

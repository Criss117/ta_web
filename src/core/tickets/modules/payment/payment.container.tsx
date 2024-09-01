"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { usePaymentState } from "./state/payment.state";

import { ProductTicketToPayAdapter } from "./adapters/product-ticket-to-pay.adapter";
import { formatCurrency } from "@/lib/utils";
import PayModal from "./components/pay-modal";
import { Ticket } from "../../models/type";

interface Props {
  ticket: Ticket | null;
}

function PayMentContainer({ ticket }: Props) {
  const { total, setInitialState } = usePaymentState();

  useEffect(() => {
    if (!ticket) return;
    setInitialState(ProductTicketToPayAdapter.adapt(ticket));
  }, [ticket?.products, ticket?.products.length]);

  return (
    <div className="fixed bottom-0 w-full bg-lightbg-300 h-32 py-2 px-10 flex">
      <div className="h-full flex items-center w-1/2">
        <Button variant="default" className="w-52 my-auto">
          Ventas del día
        </Button>
      </div>
      <div className="h-full flex items-center  w-1/2">
        <div className="w-1/2 flex justify-end">
          {total === 0 ? (
            <Button variant="default" className="h-20 w-52" disabled>
              <p>Cobrar</p>
            </Button>
          ) : (
            <PayModal />
          )}
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

export default PayMentContainer;

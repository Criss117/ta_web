"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import LoaderComponent from "@/components/ui/loader-component";
import { toast } from "@/components/ui/use-toast";
import useMakePayment from "@Core/tickets/application/hooks/use.make-payment";
import TicketToSaleEntity from "@Core/tickets/domain/entities/ticket-to-sale.entity";

interface Props {
  isCredit: boolean;
  ticket: TicketToSaleEntity;
}

const PayModalActions = ({ isCredit, ticket }: Props) => {
  const { isPending, mutate } = useMakePayment();

  const handleClick = () => {
    if (isCredit && !ticket.clientId) {
      toast({
        variant: "destructive",
        title: "Cobrar",
        description: "Debe seleccionar un cliente",
      });
      return;
    }

    mutate(ticket);
  };
  return (
    <>
      {/* <Button className="w-full" onClick={handleClick} disabled={isPending}>
        <LoaderComponent
          title="Cobrar e imprimir Ticket"
          isLoading={isPending}
        />
      </Button> */}
      <Button className="w-full" onClick={handleClick} disabled={isPending}>
        <LoaderComponent
          title="Cobrar solo registrando la venta"
          isLoading={isPending}
        />
      </Button>
    </>
  );
};

export default PayModalActions;

"use client";

import { useMutation } from "@tanstack/react-query";
import TicketUseCaseFactory from "../../composition-root/ticket.usecase.factory";
import TicketToSaleEntity from "../../domain/entities/ticket-to-sale.entity";
import { toast } from "@/components/ui/use-toast";
import { isErrored } from "stream";
import usePaymentState from "../state/payment.state";
import useTicketsSaleState from "../state/use.tickets-sale.state";

interface Props {
  newTicket: TicketToSaleEntity;
  userId?: string;
  ccNumber?: string;
}

async function makePayment({ newTicket, userId, ccNumber }: Props) {
  const makePaymentUseCase = TicketUseCaseFactory.createMakePayment();

  return await makePaymentUseCase.execute(newTicket, userId, ccNumber);
}

const useMakePayment = () => {
  const { clearState } = usePaymentState();
  const { clearTicket } = useTicketsSaleState();

  const makePaymentMutation = useMutation({
    mutationFn: makePayment,
    onSuccess: (response) => {
      console.log({ response });

      if (!response || response.error) {
        toast({
          variant: "destructive",
          title: response.error || "Error al crear el ticket",
          description: response.error || "Error al crear el ticket",
        });

        return;
      }

      clearState();
      clearTicket();
      toast({
        title: "Ticket creado",
        description: "Se ha creado el ticket correctamente",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error al crear el ticket",
      });
    },
  });

  const mutate = (ticket: TicketToSaleEntity) => {
    makePaymentMutation.mutate({
      newTicket: ticket,
      userId: ticket.clientId,
      ccNumber: ticket.ccNumber,
    });
  };

  return {
    makePaymentMutation,
    isPending: makePaymentMutation.isPending,
    isError: makePaymentMutation.isError,
    error: makePaymentMutation.error?.message || "",
    mutate,
  };
};

export default useMakePayment;

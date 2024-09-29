"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import TicketUseCaseFactory from "../../composition-root/ticket.usecase.factory";
import { TICKET_MESSAGE } from "@/lib/messages/ticket.message";
import { toast } from "@/components/ui/use-toast";

interface Params {
  ccNumber: string;
  ticketId: number;
  clientId: number;
}

async function deleteTicketFn({ ticketId, clientId }: Params) {
  const deletTicketUseCase = TicketUseCaseFactory.createDeleteTicket();

  await deletTicketUseCase.execute(ticketId, clientId);
}

const useDeleteTicket = ({ ticketId, clientId, ccNumber }: Params) => {
  const queryClient = useQueryClient();
  const deleteTicketMutation = useMutation({
    mutationFn: () => deleteTicketFn({ ticketId, clientId, ccNumber }),
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["products-sale", clientId, ticketId],
      });
      queryClient.refetchQueries({
        queryKey: ["client", ccNumber],
      });
      toast({
        title: TICKET_MESSAGE.DELETE_SUCCESS,
      });
    },
  });

  const deleteTicket = () => {
    deleteTicketMutation.mutate();
  };

  return {
    isPending: deleteTicketMutation.isPending,
    isSuccess: deleteTicketMutation.isSuccess,
    deleteTicket,
  };
};

export default useDeleteTicket;
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteTicketAction from "../actions/delete-ticket.action";
import { toast } from "@/components/ui/use-toast";
import { TICKET_MESSAGE } from "@/lib/messages/ticket.message";

interface Props {
  id: number | undefined;
  ccNumber: string;
}

const useDeleteTicket = ({ ccNumber, id }: Props) => {
  const queryClient = useQueryClient();

  const deleteTicketMutation = useMutation({
    mutationFn: () => deleteTicketAction({ ccNumber, id: id || 0 }),
    onSuccess: (res) => {
      if (res.error) {
        toast({
          variant: "destructive",
          title: TICKET_MESSAGE.DELETE_ERROR_TITLE,
          description: res.error,
        });
        return;
      }

      queryClient.removeQueries({
        queryKey: ["products-sale", ccNumber, id],
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

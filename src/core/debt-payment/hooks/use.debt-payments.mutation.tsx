"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDebtPaymentAction } from "../actions/delete-debt-payment.action";
import { toast } from "@/components/ui/use-toast";
import { DEBT_PAYMENT_MESSAGES } from "@/lib/messages/pay.message";

interface Props {
  id: number;
  clientId: number;
}

export const useDeleteDebtPayment = ({ clientId, id }: Props) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteDebtPaymentAction({ clientId, id }),
    onSuccess: (res) => {
      console.log(res);
      if (res.error || !res.success) {
        toast({
          variant: "destructive",
          title: DEBT_PAYMENT_MESSAGES.ERROR_TITLE,
          description: res.error,
        });
        return;
      }

      queryClient.refetchQueries({
        queryKey: ["client-payments", clientId],
      });

      queryClient.refetchQueries({
        queryKey: ["client", res.data?.ccNumber],
      });

      toast({
        title: DEBT_PAYMENT_MESSAGES.DELETE_SUCCESS,
      });
    },
  });

  const mutate = () => {
    if (clientId < 0 || id < 0) return;
    deleteMutation.mutate();
  };

  return {
    deleteMutation,
    mutate,
  };
};

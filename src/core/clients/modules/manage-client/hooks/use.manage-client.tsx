"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDebtPaymentAction } from "../actions/debt-payment.actions";
import { toast } from "@/components/ui/use-toast";
import { DEBT_PAYMENT_MESSAGES } from "@/lib/messages/pay.message";

const useMangeClient = () => {
  const queryClient = useQueryClient();

  const createDebtPay = useMutation({
    mutationFn: createDebtPaymentAction,
    onSuccess: (res) => {
      if (res.error || !res.success) {
        toast({
          variant: "destructive",
          title: DEBT_PAYMENT_MESSAGES.ERROR_TITLE,
          description: res.error,
        });
        return;
      }

      queryClient.refetchQueries({
        queryKey: ["client", res.data?.ccNumber],
      });

      toast({
        title: DEBT_PAYMENT_MESSAGES.SUCCESS,
      });
    },
  });

  const onCreateDebtPay = (amount: string, clientId: number) => {
    createDebtPay.mutate({ amount: amount.toString(), clientId });
  };

  return { createDebtPay, onCreateDebtPay };
};

export default useMangeClient;

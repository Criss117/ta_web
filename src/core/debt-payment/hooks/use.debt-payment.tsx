"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateDebtPaymentSchema } from "../models/schemas";
import { DEBT_PAYMENT_MESSAGES } from "@/lib/messages/pay.message";
import type { DebtPaymentForm } from "../models/type";
import { createDebtPaymentAction } from "../actions/create-debt-payment.actions";

export const useDebtPayment = () => {
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

export const useDebtPaymentForm = ({ clientId }: { clientId: number }) => {
  const { onCreateDebtPay: onMutate, createDebtPay } = useDebtPayment();

  const debtPaymentForm = useForm<DebtPaymentForm>({
    resolver: zodResolver(CreateDebtPaymentSchema),
    defaultValues: {
      amount: "0",
      clientId,
    },
  });

  const onCreateDebtPayment = debtPaymentForm.handleSubmit(
    (data: DebtPaymentForm) => {
      onMutate(data.amount, clientId);
    }
  );

  const clearForm = () => {
    debtPaymentForm.reset();
  };

  return {
    isPending: createDebtPay.isPending,
    isSuccess: createDebtPay.isSuccess,
    debtPaymentForm,
    onCreateDebtPayment,
    clearForm,
  };
};

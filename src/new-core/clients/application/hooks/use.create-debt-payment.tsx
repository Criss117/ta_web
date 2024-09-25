"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import DebtPaysUseCasesFactory from "../../composition-root/debt-pay.usecases.factory";
import { toast } from "@/components/ui/use-toast";
import { DEBT_PAYMENT_MESSAGES } from "@/lib/messages/pay.message";

interface Params {
  clientId: number;
  amount: number;
}

async function createDebtPayment({ clientId, amount }: Params) {
  const createDebtPaymentUseCase =
    DebtPaysUseCasesFactory.createCreateDebtPay();

  return await createDebtPaymentUseCase.execute(clientId, amount);
}

const useCreateDebtPayment = () => {
  const queryClient = useQueryClient();

  const createDebtPaymentMutation = useMutation({
    mutationFn: createDebtPayment,
    onSuccess: (data) => {
      queryClient.refetchQueries({
        queryKey: ["client", data?.client?.ccNumber],
      });

      toast({
        title: DEBT_PAYMENT_MESSAGES.SUCCESS,
      });
    },
  });

  const onCreateDebtPay = (amount: number, clientId: number) => {
    createDebtPaymentMutation.mutate({ amount, clientId });
  };

  return {
    isPending: createDebtPaymentMutation.isPending,
    isSuccess: createDebtPaymentMutation.isSuccess,
    onCreateDebtPay,
  };
};

export default useCreateDebtPayment;

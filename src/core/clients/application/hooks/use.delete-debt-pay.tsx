"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import DebtPaysUseCasesFactory from "../../composition-root/debt-pay.usecases.factory";
import { DEBT_PAYMENT_MESSAGES } from "@/lib/messages/pay.message";
import { toast } from "@/components/ui/use-toast";

interface Params {
  id: number;
  clientId: number;
}

async function deleteDebtPayment({ clientId, id }: Params) {
  const deleteDebtPayUseCase = DebtPaysUseCasesFactory.createDeleteDebtPay();

  return await deleteDebtPayUseCase.execute(id, clientId);
}

const useDeleteDebtPay = ({ id, clientId }: Params) => {
  const queryClient = useQueryClient();

  const deleteDebtPayMutation = useMutation({
    mutationFn: () => deleteDebtPayment({ id, clientId }),

    onSuccess: (data) => {
      queryClient.refetchQueries({
        queryKey: ["client-debt-payments", clientId],
      });

      if (data && data.client) {
        queryClient.refetchQueries({
          queryKey: ["client", data.client.ccNumber],
        });
      }

      toast({
        title: DEBT_PAYMENT_MESSAGES.DELETE_SUCCESS,
      });
    },
  });

  const mutate = () => {
    if (clientId < 0 || id < 0) return;
    deleteDebtPayMutation.mutate();
  };

  return {
    deleteDebtPayMutation,
    mutate,
  };
};

export default useDeleteDebtPay;
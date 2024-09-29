"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import ClientUseCasesFactory from "../../composition-root/client-usecases.factory";
import { toast } from "@/components/ui/use-toast";
import { SETTLE_DEBT_MESSAGE } from "@/lib/messages/ticket.message";

async function settleDebt(clientId: number) {
  const settleDebtUseCase = ClientUseCasesFactory.createSettleDebt();

  return settleDebtUseCase.execute(clientId);
}

const useSettleDebt = () => {
  const queryClient = useQueryClient();

  const settleDebtMutation = useMutation({
    mutationFn: settleDebt,
    onSuccess: (response) => {
      if (!response || response.error) {
        toast({
          variant: "destructive",
          title: SETTLE_DEBT_MESSAGE.ERROR_TITLE,
          description: response.error,
        });

        return;
      }

      toast({
        title: SETTLE_DEBT_MESSAGE.SUCCESS,
      });

      queryClient.refetchQueries({
        queryKey: ["client", response?.data?.ccNumber],
      });
    },
  });

  const onSettleDebt = (clientId: number) => {
    settleDebtMutation.mutate(clientId);
  };

  return {
    isPending: settleDebtMutation.isPending,
    isSuccess: settleDebtMutation.isSuccess,
    onSettleDebt,
  };
};

export default useSettleDebt;

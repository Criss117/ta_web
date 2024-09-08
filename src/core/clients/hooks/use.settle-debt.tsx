"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { settleDebtAction } from "../actions/settle-debt.action";
import { toast } from "@/components/ui/use-toast";
import { SETTLE_DEBT_MESSAGE } from "@/lib/messages/ticket.message";

async function action(clientId: number) {
  return await settleDebtAction({ clientId });
}

const useSettleDebt = () => {
  const queryClient = useQueryClient();

  const settleDebtMutation = useMutation({
    mutationFn: action,
    onSuccess: (res) => {
      if (res.error) {
        toast({
          variant: "destructive",
          title: SETTLE_DEBT_MESSAGE.ERROR_TITLE,
          description: res.error,
        });
        return;
      }

      toast({
        title: SETTLE_DEBT_MESSAGE.SUCCESS,
      });

      queryClient.refetchQueries({
        queryKey: ["client", res.data?.ccNumber],
      });
    },
  });

  const settleDebt = (clientId: number) => {
    settleDebtMutation.mutate(clientId);
  };

  return {
    isPending: settleDebtMutation.isPending,
    isSuccess: settleDebtMutation.isSuccess,
    settleDebt,
  };
};

export default useSettleDebt;

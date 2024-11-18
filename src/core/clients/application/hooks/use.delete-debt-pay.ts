import { useMutation, useQueryClient } from "@tanstack/react-query";
import DebtPaysUseCasesFactory from "../../composition-root/debt-pay.usecases.factory";
import { DEBT_PAYMENT_MESSAGES } from "@/lib/messages/pay.message";
import { toast } from "@/components/ui/use-toast";

interface Params {
  id: string;
  clientId: string;
}

async function deleteDebtPayment({ clientId, id }: Params) {
  const deleteDebtPayUseCase = DebtPaysUseCasesFactory.createDeleteDebtPay();

  return await deleteDebtPayUseCase.execute(id, clientId);
}

const useDeleteDebtPay = ({ id, clientId }: Params) => {
  const queryClient = useQueryClient();

  const deleteDebtPayMutation = useMutation({
    mutationFn: () => deleteDebtPayment({ id, clientId }),

    onSuccess: (response) => {
      if (!response || response.error) {
        toast({
          variant: "destructive",
          title: DEBT_PAYMENT_MESSAGES.DELETE_ERROR,
          description: response.error,
        });

        return;
      }

      queryClient.refetchQueries({
        queryKey: ["client-debt-payments", clientId],
      });

      if (response && response.data?.client) {
        queryClient.refetchQueries({
          queryKey: ["client", response.data.client.ccNumber],
        });
      }

      toast({
        title: DEBT_PAYMENT_MESSAGES.DELETE_SUCCESS,
      });
    },
  });

  const mutate = () => {
    if (clientId.length <= 0 || id.length <= 0) return;
    deleteDebtPayMutation.mutate();
  };

  return {
    deleteDebtPayMutation,
    mutate,
  };
};

export default useDeleteDebtPay;

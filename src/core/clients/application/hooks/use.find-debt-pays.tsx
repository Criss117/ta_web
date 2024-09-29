"use client";

import { useQuery } from "@tanstack/react-query";
import DebtPaysUseCasesFactory from "../../composition-root/debt-pay.usecases.factory";

async function findDebtPays(clientId: number) {
  const findDebtPaysUseCase = DebtPaysUseCasesFactory.createFindByClientId();

  return await findDebtPaysUseCase.execute(clientId);
}

const useFindDebtPays = (clientId: number) => {
  const findDebtPaysQuery = useQuery({
    queryFn: () => findDebtPays(clientId),
    queryKey: ["client-debt-payments", clientId],
    refetchOnWindowFocus: false,
  });

  const onFindDebtPays = () => {
    findDebtPaysQuery.refetch();
  };

  return {
    onFindDebtPays,
    findDebtPaysQuery,
  };
};

export default useFindDebtPays;

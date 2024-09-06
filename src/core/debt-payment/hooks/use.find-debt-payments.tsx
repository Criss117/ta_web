"use client";

import { useQuery } from "@tanstack/react-query";
import { findDPByClientId } from "../actions/find-dp-by-clientid";

interface Props {
  clientId: number;
}

const useFindDebtPayments = ({ clientId }: Props) => {
  const findDebtPaymets = useQuery({
    queryFn: () => findDPByClientId({ clientId }),
    queryKey: ["client-payments", clientId],
    refetchOnWindowFocus: false,
    enabled: true,
  });

  const onFindDebtPaymets = () => {
    findDebtPaymets.refetch();
  };

  return {
    data: findDebtPaymets.data?.data,
    findDebtPaymets,
    onFindDebtPaymets,
  };
};

export default useFindDebtPayments;

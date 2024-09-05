"use client";

import { useQuery } from "@tanstack/react-query";
import { findProdSalesByTicketIdAction } from "../actions/find-prod-sales.actions";

interface Props {
  ticketId: number;
  ccNumber: string;
}

const useFindProductsSale = ({ ticketId, ccNumber }: Props) => {
  const findProductsSaleQuery = useQuery({
    queryKey: ["products-sale", ccNumber, ticketId],
    queryFn: () => findProdSalesByTicketIdAction({ ticketId, ccNumber }),
    enabled: ticketId > 0,
    refetchOnWindowFocus: false,
  });

  return {
    productsSales: findProductsSaleQuery.data?.data,
    findProductsSaleQuery,
  };
};

export default useFindProductsSale;

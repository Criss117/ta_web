"use client";

import { useQuery } from "@tanstack/react-query";
import { findProdSalesByTicketIdAction } from "../actions/find-prod-sales.actions";

interface Props {
  ticketId: number;
}

const useFindProductsSale = ({ ticketId }: Props) => {
  const findProductsSaleQuery = useQuery({
    queryKey: ["products-sale", ticketId],
    queryFn: () => findProdSalesByTicketIdAction({ ticketId }),
    enabled: ticketId > 0,
    refetchOnWindowFocus: false,
  });

  return {
    productsSales: findProductsSaleQuery.data?.data,
    findProductsSaleQuery,
  };
};

export default useFindProductsSale;

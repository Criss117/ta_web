"use client";

import { useQuery } from "@tanstack/react-query";
import { FindByTicketDto } from "../dto/find-by-ticket.dto";
import ProductsSaleUseCasesFactory from "../../composition-root/products-sale-usecase.factory";

interface Props {
  ticketId: string;
  clientId: string;
}

async function findByTicket(findByTicket: FindByTicketDto) {
  const findByTicketUseCase =
    ProductsSaleUseCasesFactory.createFindByTicketUseCase();

  return findByTicketUseCase.execute(findByTicket);
}

const useFindByTicket = ({ clientId, ticketId }: Props) => {
  const useFindTicketQuery = useQuery({
    queryKey: ["products-sale", clientId, ticketId],
    queryFn: () => findByTicket({ clientId, ticketId }),
  });

  return {
    data: useFindTicketQuery.data?.data,
    isFetching: useFindTicketQuery.isFetching,
    isSuccess: useFindTicketQuery.isSuccess,
    isPending: useFindTicketQuery.isPending,
    error: useFindTicketQuery.error,
    useFindTicketQuery,
  };
};

export default useFindByTicket;

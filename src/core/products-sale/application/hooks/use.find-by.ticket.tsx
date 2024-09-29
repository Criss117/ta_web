"use client";

import { useQuery } from "@tanstack/react-query";
import { FindByTicketDto } from "../dto/find-by-ticket.dto";
import ProductsSaleUseCasesFactory from "../../composition-root/products-sale-usecase.factory";

interface Props {
  ticketId: number;
  clientId: number;
}

async function findByTicketAction(findByTicket: FindByTicketDto) {
  if (findByTicket.clientId === -1) {
    return [];
  }

  const findByTicketUseCase =
    ProductsSaleUseCasesFactory.createFindByTicketUseCase();

  return findByTicketUseCase.execute(findByTicket);
}

const useFindByTicket = ({ clientId, ticketId }: Props) => {
  const useFindTicketQuery = useQuery({
    queryKey: ["products-sale", clientId, ticketId],
    queryFn: () => findByTicketAction({ clientId, ticketId }),
  });

  return { useFindTicketQuery };
};

export default useFindByTicket;

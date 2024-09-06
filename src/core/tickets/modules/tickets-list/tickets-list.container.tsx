import { useEffect } from "react";
import { Ticket } from "@prisma/client";

import { TicketsToListAdapter } from "./adapters/tickets-to-list.adapter";
import TicketsAccordion from "./components/tickets-accordion";
import { useTicketListState } from "./state/ticket-list.state";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import ProductsSaleTableContainer, {
  ProductsSaleTableSkeleton,
} from "@/core/products-sale/modules/products-sale-table/products-sale-table.container";

interface Props {
  tickets: Ticket[];
  ccNumber: string;
}

const TicketListContainer = ({ tickets, ccNumber }: Props) => {
  const { currentTicket, setTicket, clearState } = useTicketListState();

  useEffect(() => {
    setTicket(TicketsToListAdapter.adapt(tickets));
  }, [tickets]);

  useEffect(() => {
    return () => clearState();
  }, []);

  return (
    <div className="flex mt-5 gap-x-10 flex-grow">
      <div className="w-1/5">
        <TicketsAccordion />
      </div>
      <div className="w-4/5 relative ">
        {currentTicket ? (
          <ProductsSaleTableContainer
            ticketId={currentTicket?.id}
            ccNumber={ccNumber}
            total={currentTicket?.total || 0}
          />
        ) : (
          <ProductsSaleTableSkeleton />
        )}
        <footer className="absolute bottom-[5%] w-full bg-lightbg-300 h-16 flex justify-end">
          <p className="text-center my-auto text-xl font-semibold mx-10">
            Total:{" "}
            <span className="font-bold text-3xl mx-2">
              {formatCurrency(currentTicket?.total || 0)}
            </span>
          </p>
          <Separator orientation="vertical" />
          <div className="my-auto mx-10 space-x-5">
            <Button>Imprimir</Button>
            <Button variant="destructive">Eliminar</Button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default TicketListContainer;

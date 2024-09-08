"use client";
import { useEffect } from "react";
import { Ticket } from "@prisma/client";

import TicketsAccordion from "./components/tickets-accordion";
import { TicketsToListAdapter } from "./adapters/tickets-to-list.adapter";
import { useTicketListState } from "./state/ticket-list.state";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import ProductsSaleTableContainer, {
  ProductsSaleTableSkeleton,
} from "@/core/products-sale/modules/products-sale-table/products-sale-table.container";
import DeleteAlertDialog from "@/components/delete-alert-dialog";
import useDeleteTicket from "../../hooks/use.delete-ticket";

interface Props {
  tickets: Ticket[];
  ccNumber: string;
}

const TicketListContainer = ({ tickets, ccNumber }: Props) => {
  const { currentTicket, setTicket, clearState } = useTicketListState();
  const { isPending, isSuccess, deleteTicket } = useDeleteTicket({
    ccNumber,
    id: currentTicket?.id,
  });

  useEffect(() => {
    setTicket(TicketsToListAdapter.adapt(tickets));
  }, [tickets]);

  useEffect(() => {
    return () => clearState();
  }, []);

  const handleClick = () => {
    if (!currentTicket) return;
    deleteTicket();
  };

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
            {!currentTicket?.id && (
              <>
                <Button disabled>Imprimir</Button>
                <Button variant="destructive" disabled>
                  Eliminar
                </Button>
              </>
            )}
            {currentTicket?.id && (
              <>
                <Button>Imprimir</Button>
                <DeleteAlertDialog
                  isPending={isPending}
                  isSuccess={isSuccess}
                  handleClick={handleClick}
                  description={() => (
                    <span className="flex flex-col">
                      El ticket con código {currentTicket?.id} sera eliminado.
                      <span>Esta operación no se puede deshacer.</span>
                    </span>
                  )}
                  title="Está seguro de eliminar este ticket?"
                />
              </>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default TicketListContainer;

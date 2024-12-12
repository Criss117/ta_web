"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import TicketEntity from "@Core/tickets/domain/entities/ticket.entity";
import useDeleteTicket from "@Core/tickets/application/hooks/use.delete-ticket";
import TicketsList from "@Core/tickets/presentation/components/tickets-list/tickets-list";
import ProductsSaleTable from "@Core/products-sale/presentation/components/products-sale-table";
import DeleteAlertDialog from "@Core/common/components/delete-alert-dialog";

import { formatCurrency } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface Props {
  ccNumber: string;
  clientId: string;
  tickets: Array<TicketEntity>;
}

const TicketsProductsList = ({ clientId, tickets, ccNumber }: Props) => {
  const [currentTicketId, setCurrentTicketId] = useState("");
  const { isPending, isSuccess, deleteTicket } = useDeleteTicket({
    clientId,
    ticketId: currentTicketId,
    ccNumber,
  });

  const currentTicket = useMemo(() => {
    if (currentTicketId.length <= 0) return undefined;
    return tickets.find((ticket) => ticket.id === currentTicketId);
  }, [currentTicketId, tickets]);

  const handleDelete = useCallback(() => {
    if (currentTicketId.length <= 0) return;
    deleteTicket();
  }, [currentTicketId]);

  useEffect(() => {
    if (!isSuccess) return;

    if (currentTicketId.length > 0) {
      setCurrentTicketId("");
    }

    return () => setCurrentTicketId("");
  }, [isSuccess]);

  return (
    <div className="flex mt-5 gap-x-10 flex-grow">
      <div className="w-1/5">
        <TicketsList
          tickets={tickets || []}
          onSetCurrentTicketId={setCurrentTicketId}
        />
      </div>
      <div className="w-4/5 relative ">
        <ProductsSaleTable clientId={clientId} ticketId={currentTicketId} />
        <footer className="absolute bottom-[5%] w-full bg-lightbg-300 h-16 flex justify-end">
          <p className="text-center my-auto text-xl font-semibold mx-10">
            Total:{" "}
            <span className="font-bold text-3xl mx-2">
              {formatCurrency(currentTicket?.total || 0)}
            </span>
          </p>
          <Separator orientation="vertical" />
          <div className="my-auto mx-10 space-x-5">
            {currentTicketId.length <= 0 ? (
              <>
                {/* <Button disabled>Imprimir</Button> */}
                <Button variant="destructive" disabled>
                  Eliminar
                </Button>
              </>
            ) : (
              <>
                {/* <Button>Imprimir</Button> */}
                <DeleteAlertDialog
                  isPending={isPending}
                  isSuccess={isSuccess}
                  handleClick={handleDelete}
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

export default TicketsProductsList;

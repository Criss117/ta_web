"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { useSaleState } from "../state/sale.state";
import { PlusCircle } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

const TicketsNav = () => {
  const {
    tickets,
    currentTicketId,
    newTicket,
    changeCurrentTicketId,
    deleteTicket,
  } = useSaleState();

  const ticketsLabels = tickets.map((t) => {
    return {
      label: t.label,
      id: t.id,
      onClick: () => {
        changeCurrentTicketId(t.id);
      },
      onDelete: () => {
        deleteTicket(t.id);
      },
    };
  });

  return (
    <nav className="mt-5 bg-lightprimary-200 w-full p-2 rounded-lg flex gap-x-2">
      {ticketsLabels.map((t) => (
        <ContextMenu key={t.id}>
          <ContextMenuTrigger>
            <Button
              asChild
              className="hover:cursor-pointer"
              variant={t.id === currentTicketId ? "default" : "outline"}
              onClick={t.onClick}
            >
              <p>{t.label}</p>
            </Button>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem
              className="hover:cursor-pointer"
              onClick={t.onDelete}
            >
              <p>Eliminar</p>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ))}
      {ticketsLabels.length !== 10 && (
        <Button
          variant="outline"
          onClick={() => {
            newTicket();
          }}
        >
          <PlusCircle />
        </Button>
      )}
    </nav>
  );
};

export default TicketsNav;

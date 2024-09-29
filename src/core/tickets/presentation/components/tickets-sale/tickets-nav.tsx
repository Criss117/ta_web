"use client";

import React from "react";
import { CircleXIcon, EraserIcon, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import useTicketsSaleState from "@Core/tickets/application/state/use.tickets-sale.state";

const TicketsNav = () => {
  const {
    tickets,
    currentTicketId,
    setNewTicket,
    changeCurrentTicketId,
    deleteTicket,
    clearTicket,
  } = useTicketsSaleState();

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
      onClear: () => {
        clearTicket(t.id);
      },
    };
  });

  return (
    <>
      {ticketsLabels.map((t) => (
        <ContextMenu key={t.id}>
          <ContextMenuTrigger>
            <Button
              asChild
              size="sm"
              className="hover:cursor-pointer"
              variant={t.id === currentTicketId ? "default" : "outline"}
              onClick={t.onClick}
            >
              <p>{t.label}</p>
            </Button>
          </ContextMenuTrigger>
          <ContextMenuContent className="py-2">
            <ContextMenuLabel>{t.label}</ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuItem
              className="hover:cursor-pointer space-x-2"
              onSelect={t.onClear}
            >
              <EraserIcon />
              <p>Limpiar</p>
            </ContextMenuItem>
            <ContextMenuItem
              className="hover:cursor-pointer space-x-2"
              onSelect={t.onDelete}
            >
              <CircleXIcon className="text-destructive" />
              <p className="text-destructive">Eliminar</p>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ))}
      {ticketsLabels.length !== 10 && (
        <Button variant="outline" size="sm" onClick={setNewTicket}>
          <PlusCircle />
        </Button>
      )}
    </>
  );
};

export default TicketsNav;

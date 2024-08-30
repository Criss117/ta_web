"use client";

import { Button } from "@/components/ui/button";
import { useSaleState } from "../state/sale.state";
import { CircleXIcon, EraserIcon, PlusCircle } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Separator } from "@/components/ui/separator";

const TicketsNav = () => {
  const {
    tickets,
    currentTicketId,
    newTicket,
    changeCurrentTicketId,
    deleteTicket,
    clearTicket,
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
      onClear: () => {
        clearTicket(t.id);
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

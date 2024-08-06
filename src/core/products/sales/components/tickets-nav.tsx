"use client";

import { Button } from "@/components/ui/button";
import { useSaleState } from "../state/sale.state";
import { PlusCircle } from "lucide-react";

const TicketsNav = () => {
  const { tickets, currentTicketId, newTicket, changeCurrentTicketId } =
    useSaleState();

  const ticketsLabels = tickets.map((t) => {
    return {
      label: t.label,
      id: t.id,
      onClick: () => {
        changeCurrentTicketId(t.id);
      },
    };
  });

  return (
    <nav className="mt-5 bg-lightprimary-200 w-full p-2 rounded-lg flex gap-x-2">
      {ticketsLabels.map((t) => (
        <Button
          key={t.id}
          variant={t.id === currentTicketId ? "default" : "outline"}
          onClick={t.onClick}
        >
          {t.label}
        </Button>
      ))}
      <Button
        variant="outline"
        onClick={() => {
          newTicket();
        }}
      >
        <PlusCircle />
      </Button>
    </nav>
  );
};

export default TicketsNav;

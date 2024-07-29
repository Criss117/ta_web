"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useTicketState } from "../state/ticket.state";
import { cn } from "@/lib/utils";

const TicketsNav = () => {
  const { currentTicketId, tickets, changeCurrentTicket, createTicket } =
    useTicketState();

  return (
    <nav className="mt-2">
      <ul className="flex bg-lighttext-200 w-full px-2 py-1 gap-x-2">
        {tickets.map((ticket) => (
          <li key={ticket.id}>
            <Button
              variant="ghost"
              className={cn("text-white text-sm", {
                "bg-accent text-black": ticket.id === currentTicketId,
              })}
              onClick={() => changeCurrentTicket(ticket.id)}
            >
              {ticket.ticketName}
            </Button>
          </li>
        ))}

        <li>
          <Button
            variant="ghost"
            className="text-white text-sm"
            onClick={createTicket}
          >
            <PlusCircle size={20} />
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default TicketsNav;

"use client";
import type { PropsWithChildren } from "react";

import { Accordion } from "@/components/ui/accordion";
import { AccorItem } from "./accor-item";
import { DAYS, MONTHS } from "@/lib/constants/months";
import { Button } from "@/components/ui/button";
import type { TicketMonth } from "../models/types";
import { cn } from "@/lib/utils";
import { useTicketListState } from "../state/ticket-list.state";

interface Props extends PropsWithChildren {
  ticketsList: TicketMonth;
  className?: string;
}

export const MonthAccordion = ({ ticketsList, className }: Props) => {
  const { setCurrentTicket } = useTicketListState();

  return (
    <Accordion
      className={cn("mt-2 px-3 space-y-2", className)}
      type="single"
      collapsible
    >
      {Object.keys(ticketsList).map((monthStr, index) => {
        const month = Number(monthStr);
        return (
          <AccorItem
            key={index}
            value={`${monthStr}`}
            trigger={MONTHS[month]}
            className="px-2 bg-lightprimary-300 shadow text-white"
          >
            <div className="flex flex-col gap-y-2 mt-2 px-2">
              {ticketsList[month].map((ticket) => (
                <Button
                  key={ticket.id}
                  variant="secondary"
                  className="h-6 bg-lightprimary-100 shadow"
                  onClick={() => setCurrentTicket(ticket)}
                >
                  <span>{ticket.day}</span> - <span>{DAYS[ticket.dayId]}</span>
                </Button>
              ))}
            </div>
          </AccorItem>
        );
      })}
    </Accordion>
  );
};

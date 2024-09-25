"use client";
import { Accordion } from "@/components/ui/accordion";

import { AccorItem } from "./accor-item";
import { useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MonthAccordion } from "./month-accordion";
import { TicketYear } from "@Core/tickets/application/models/types";

interface Props {
  tickets: TicketYear;
}

const TicketsAccordion = ({ tickets }: Props) => {
  const multipleYears = useMemo(() => Object.keys(tickets), [tickets]);

  if (multipleYears.length === 1) {
    const year = Number(multipleYears[0]);
    return (
      <ScrollArea className="w-full px-1 py-1 space-y-2 bg-lightbg-300 min-h-[80%] h-[80%] max-h-[80%]">
        <MonthAccordion
          ticketsList={tickets[year]}
          className="w-full px-1 py-1 space-y-2 bg-lightbg-300 h-full"
        />
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="w-full px-1 py-1 space-y-2 bg-lightbg-300 min-h-[80%] h-[80%] max-h-[80%]">
      <Accordion type="single" collapsible className="w-full space-y-2">
        {Object.keys(tickets).map((yearStr, index) => {
          const year = Number(yearStr);
          const month = tickets[year];
          return (
            <AccorItem
              key={index}
              value={yearStr}
              trigger={yearStr}
              className="px-2 bg-black shadow-xl text-white"
            >
              <MonthAccordion ticketsList={month} />
            </AccorItem>
          );
        })}
      </Accordion>
    </ScrollArea>
  );
};

export default TicketsAccordion;

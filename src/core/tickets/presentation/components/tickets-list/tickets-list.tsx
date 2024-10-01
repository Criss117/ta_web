"use client";

import { useEffect } from "react";

import TicketEntity from "@Core/tickets/domain/entities/ticket.entity";
import TicketsAccordion from "./tickets-accordion";
import TicketMapper from "@Core/tickets/application/mappers/ticket.mapper";
import useCurrentTicketState from "@Core/tickets/application/state/current-ticket.state";

interface Props {
  tickets: Array<TicketEntity>;
  onSetCurrentTicketId: (ticketId: string) => void;
}

const TicketsList = ({ tickets, onSetCurrentTicketId }: Props) => {
  const { currentTicket } = useCurrentTicketState();

  useEffect(() => {
    if (!currentTicket) return;
    onSetCurrentTicketId(currentTicket.id);
  }, [currentTicket?.id]);

  return (
    <TicketsAccordion tickets={TicketMapper.domainToTicketYear(tickets)} />
  );
};

export default TicketsList;

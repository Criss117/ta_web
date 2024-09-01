"use client";

import { useEffect, useMemo } from "react";

import useSales from "./hooks/use.tickets";
import TicketsNav from "./components/tickets-nav";
import TicketsTable from "./components/tickets-table";
import ProductsSearchContainer from "../products/modules/products-search/products-search.container";
import { useTicketsState } from "./state/tickets.state";
import PayMentContainer from "./modules/payment/payment.container";

const TicketsContainer = () => {
  const { tickets, currentTicketId, getStateFromLS, getCurrentTicket } =
    useTicketsState();
  const { handleSearch } = useSales();

  const currentTicket = useMemo(() => {
    return getCurrentTicket();
  }, [currentTicketId, tickets]);

  useEffect(() => {
    getStateFromLS();
  }, []);

  return (
    <>
      <section className="mx-10">
        <nav className="mt-5 sticky top-20 z-50 bg-lightbg-200">
          <header className="w-2/3">
            <ProductsSearchContainer
              onTicket
              searchByBarcodeFn={handleSearch}
            />
          </header>
          <TicketsNav />
        </nav>
        <TicketsTable />
      </section>
      <PayMentContainer ticket={currentTicket} />
    </>
  );
};

export default TicketsContainer;

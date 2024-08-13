"use client";

import { useEffect } from "react";

import useSales from "./hooks/use.sales";
import { useSaleState } from "./state/sale.state";
import TicketsNav from "./components/tickets-nav";
import PayContainer from "@/core/pay/pay.container";
import TicketsTable from "./components/tickets-table";
import ProductsSearchContainer from "../products-search/products-search.container";

const SalesContainer = () => {
  const { tickets, currentTicketId, getStateFromLS } = useSaleState();

  const { handleSearch } = useSales();

  useEffect(() => {
    getStateFromLS();
  }, []);

  return (
    <>
      <section className="mx-10">
        <nav className="mt-5">
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
      <PayContainer tickets={tickets} currentTicketId={currentTicketId} />
    </>
  );
};

export default SalesContainer;

"use client";

import useSales from "./hooks/use.sales";
import TicketsTable from "./components/tickets-table";
import ProductsSearchContainer from "../products-search/products-search.container";
import TicketsNav from "./components/tickets-nav";
import { useSaleState } from "./state/sale.state";
import { useEffect } from "react";

const SalesContainer = () => {
  const { getStateFromLS } = useSaleState();

  const { handleSearch } = useSales();

  useEffect(() => {
    getStateFromLS();
  }, []);

  return (
    <section className="mx-10">
      <nav className="mt-10">
        <div className="w-2/3">
          <ProductsSearchContainer onTicket searchByBarcodeFn={handleSearch} />
        </div>
        <TicketsNav />
      </nav>
      <TicketsTable />
    </section>
  );
};

export default SalesContainer;

"use client";
import ProductsSearchContainer from "../products/products-search/products-search.container";
import TicketTable from "./components/ticket-table";
import TicketsNav from "./components/tickets-nav";

import { useTicketState } from "./state/ticket.state";

const TicketsTableContainer = () => {
  const { tickets, obtainBarCodes, addProduct } = useTicketState();

  const barCodes = obtainBarCodes();

  return (
    <>
      <ProductsSearchContainer
        productsListIds={barCodes}
        addToState={addProduct}
      />
      <TicketsNav />
      <TicketTable />
      {JSON.stringify(tickets, null, 2)}
    </>
  );
};

export default TicketsTableContainer;

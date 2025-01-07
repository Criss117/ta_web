"use client";

import React, { useEffect } from "react";

import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ProductSearchBar from "@Core/products/presentation/components/form/product-search-bar";

import PayModal from "../components/payments/paymodal";
import TicketsTable from "../components/tickets-sale/tickets-table";
import useTicketsSaleState from "../../application/state/use.tickets-sale.state";
import TicketOptions from "../components/tickets-sale/ticket-options";

const TicketsScreen = () => {
  const { getCurrentTicket, addProductToCurrentTicket, getStateFromLS } =
    useTicketsSaleState();

  const currentTicket = getCurrentTicket();

  useEffect(() => {
    getStateFromLS();
  }, []);

  return (
    <>
      <section className="mx-10 mb-32">
        <nav className="mt-5 sticky top-24 z-50 bg-lightbg-200 space-y-2">
          <header className="w-2/3">
            <ProductSearchBar
              onSearch={(product) => addProductToCurrentTicket(product)}
            />
          </header>
          <TicketOptions />
        </nav>
        <TicketsTable currentTicket={currentTicket} />
      </section>
      <div className="fixed bottom-0 w-full bg-lightbg-300 h-28 py-2 px-10 flex">
        <div className="h-full flex items-center w-1/2">
          <Button variant="default" className="w-52 my-auto">
            Ventas del día
          </Button>
        </div>
        <div className="h-full flex items-center  w-1/2">
          <div className="w-1/2 flex justify-end">
            {currentTicket?.total === 0 && (
              <Button variant="default" className="h-20 w-52" disabled>
                <p>Cobrar</p>
              </Button>
            )}
            {currentTicket && currentTicket.total > 0 && (
              <PayModal currentTicket={currentTicket} />
            )}
          </div>
          <Separator orientation="vertical" className="mx-5" />
          <div className="w-1/2">
            <h3 className="text-4xl font-bold text-center">
              {formatCurrency(currentTicket?.total || 0)}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketsScreen;

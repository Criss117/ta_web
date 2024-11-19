"use client";

import { useCallback } from "react";
import { SquarePercent } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import useCurrentTicketState from "@Core/tickets/application/state/current-ticket.state";
import useTicketsSaleState from "@Core/tickets/application/state/use.tickets-sale.state";
import ProductsToSaleTable from "@Core/products/presentation/components/products-to-sale/products-to-sale-dialog";

import TicketsNav from "./tickets-nav";
import CommonArt from "./common-art";

const TicketOptions = () => {
  const { productSelected } = useCurrentTicketState();
  const { changeToWholeSalePrice, addProductToCurrentTicket } =
    useTicketsSaleState();

  const wholeSalePrice = useCallback(() => {
    if (!productSelected) return;
    changeToWholeSalePrice(productSelected);
  }, [productSelected]);

  return (
    <div className="bg-lightprimary-200 w-full p-2 rounded-lg flex gap-x-2">
      <ProductsToSaleTable onAccept={addProductToCurrentTicket} />
      {/* <CommonArt /> */}
      <Button
        disabled={!productSelected}
        size="sm"
        className="space-x-2"
        variant="outline"
        onClick={wholeSalePrice}
      >
        <SquarePercent className="w-4 h-4" />
        <p>Mayoreo</p>
      </Button>
      <Separator orientation="vertical" className="h-9" />
      <TicketsNav />
    </div>
  );
};

export default TicketOptions;

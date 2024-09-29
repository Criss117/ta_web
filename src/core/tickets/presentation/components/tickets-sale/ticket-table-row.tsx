"use client";

import React from "react";
import Link from "next/link";
import { SquarePen, Trash2 } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import ProductTicketEntity from "@/core/products/domain/entities/product-ticket.entity";
import useCurrentTicketState from "@/core/tickets/application/state/current-ticket.state";
import useTicketsSaleState from "@/core/tickets/application/state/use.tickets-sale.state";
import { ROUTES } from "@/lib/constants/nav";
import { cn } from "@/lib/utils";

interface Props {
  product: ProductTicketEntity;
}

const TicketTableRow = ({ product }: Props) => {
  const { productSelected, setProductSelected } = useCurrentTicketState();
  const { changeSalePriceOrQuantity, removeProductFromCurrentTicket } =
    useTicketsSaleState();

  const onChangeSalePrice = (
    barcode: string,
    salePrice: number,
    quantity: number
  ) => {
    changeSalePriceOrQuantity({
      barcode,
      newSalePrice: salePrice,
      newQuantity: quantity,
    });
  };

  return (
    <TableRow
      className={cn(
        "hover:bg-lightprimary-200/20 cursor-pointer transition-all",
        productSelected === product.barcode
          ? "bg-lightprimary-200 hover:bg-lightprimary-200/80"
          : ""
      )}
      onClick={() => {
        if (productSelected === product.barcode) {
          setProductSelected(null);
          return;
        }
        setProductSelected(product.barcode);
      }}
    >
      <TableCell>{product.barcode}</TableCell>
      <TableCell>{product.description}</TableCell>
      <TableCell>
        <Input
          min={1}
          type="number"
          value={product.salePrice === 0 ? "" : product.salePrice}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            onChangeSalePrice(
              product.barcode,
              Number(e.target.value),
              product.quantity
            );
          }}
        />
      </TableCell>
      <TableCell>
        <Input
          min={0}
          type="number"
          value={product.quantity === 0 ? "" : product.quantity}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            onChangeSalePrice(
              product.barcode,
              product.salePrice,
              Number(e.target.value)
            );
          }}
        />
      </TableCell>
      <TableCell>{product.subTotal}</TableCell>
      <TableCell>{product.currentStock}</TableCell>
      <TableCell className="flex gap-x-2 justify-between">
        <Button
          className="w-1/2"
          variant="destructive"
          onClick={(e) => {
            e.stopPropagation();
            removeProductFromCurrentTicket(product.barcode);
            if (productSelected === product.barcode) setProductSelected(null);
          }}
        >
          <Trash2 size={18} />
        </Button>
        <Link
          href={`${ROUTES.EDIT_PRODUCTS}/${product.barcode}`}
          className={cn(buttonVariants({ variant: "default" }), "w-1/2")}
          onClick={(e) => e.stopPropagation()}
        >
          <SquarePen size={18} />
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default TicketTableRow;

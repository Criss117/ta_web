"use client";
import Link from "next/link";
import { SquarePen, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/nav";
import { Input } from "@/components/ui/input";

import type { ProductTicket } from "../models/type";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useTicketsState } from "../state/tickets.state";

interface Props {
  data: ProductTicket[];
  onChangeSalePrice: (
    barcode: string,
    salePrice: number,
    quantity: number
  ) => void;
}

const headers = [
  {
    label: "Codigo de barras",
    key: "barcode",
    width: "w-2/12",
  },
  {
    label: "Descripción",
    key: "description",
    width: "w-3/12",
  },
  {
    label: "Precio venta",
    key: "salePrice",
    width: "w-2/12",
  },
  {
    label: "Cantidad",
    key: "quantity",
    width: "w-1/12",
  },
  {
    label: "Subtotal",
    key: "subTotal",
    width: "w-1/12",
  },
  {
    label: "Stock",
    key: "stock",
    width: "w-1/12",
  },
  {
    label: "Acciones",
    key: "actions",
    width: "w-3/12",
  },
] as const;

const TicketsTable = () => {
  const {
    getCurrentTicket,
    changeSaleORquantity,
    removeProductFromCurrentTicket,
  } = useTicketsState();

  const currentTicket = getCurrentTicket();

  const onChangeSalePrice = (
    barcode: string,
    salePrice: number,
    quantity: number
  ) => {
    changeSaleORquantity(barcode, salePrice, quantity);
  };

  return (
    <Table>
      <TableHeader className="">
        <TableRow>
          {headers.map((header) => (
            <TableHead key={header.key} className={cn(header.width)}>
              {header.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <>
          {currentTicket?.products.length ? (
            currentTicket.products.map((product) => (
              <TableRow key={product.barcode}>
                <TableCell>{product.barcode}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  <Input
                    min={1}
                    type="number"
                    value={product.salePrice === 0 ? "" : product.salePrice}
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
                    min={1}
                    type="number"
                    value={product.quantity}
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
                    onClick={() =>
                      removeProductFromCurrentTicket(product.barcode)
                    }
                  >
                    <Trash2 size={18} />
                  </Button>
                  <Link
                    href={`${ROUTES.EDIT_PRODUCTS}/${product.barcode}`}
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "w-1/2"
                    )}
                  >
                    <SquarePen size={18} />
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={headers.length} className="text-center">
                No hay productos
              </TableCell>
            </TableRow>
          )}
        </>
      </TableBody>
    </Table>
  );
};

export default TicketsTable;

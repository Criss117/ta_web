"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import TicketToSaleEntity from "@Core/tickets/domain/entities/ticket-to-sale.entity";
import useCurrentTicketState from "@Core/tickets/application/state/current-ticket.state";
import { useEffect } from "react";
import TicketTableRow from "./ticket-table-row";

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

interface Props {
  currentTicket: TicketToSaleEntity | null;
}

const TicketsTable = ({ currentTicket }: Props) => {
  const { setProductSelected } = useCurrentTicketState();

  useEffect(() => {
    if (!currentTicket?.productsTickets.length) {
      setProductSelected(null);
    }
  }, [currentTicket?.productsTickets.length]);

  useEffect(() => {
    setProductSelected(null);
  }, [currentTicket?.id]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header) => (
            <TableHead key={header.key} className={cn(header.width)}>
              {header.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {currentTicket?.productsTickets.length ? (
          currentTicket.productsTickets.map((product) => (
            <TicketTableRow product={product} key={product.barcode} />
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={headers.length} className="text-center">
              No hay productos
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TicketsTable;

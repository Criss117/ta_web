"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { useTicketState } from "../state/ticket.state";
import { useEffect, useState } from "react";
import { Ticket } from "../models/type";

const TICKETSTABLE = {
  HEADER: [
    "Código de Barras",
    "Descripción del Producto",
    "Precio venta",
    "Cant",
    "Importe",
    "Existencia",
    "Descutento",
  ],
};

const TicketTable = () => {
  const [currentTicket, setCurrentTicket] = useState<Ticket | undefined>();
  const { tickets, currentTicketId } = useTicketState();

  useEffect(() => {
    setCurrentTicket(tickets.find((ticket) => ticket.id === currentTicketId));
  }, [currentTicketId, tickets]);

  return (
    <Table className="mt-5">
      <TableHeader className="bg-slate-400">
        <TableRow>
          {TICKETSTABLE.HEADER.map((header) => (
            <TableHead key={header} className="text-white">
              {header}
            </TableHead>
          ))}
          <TableHead className="text-white">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currentTicket?.products.map((product) => (
          <TableRow key={product.barcode}>
            <TableCell>{product.barcode}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>${product.salePrice}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell>${product.subtotal}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>{product.wholesalePrice}</TableCell>
            <TableCell className="gap-x-2 flex py-2">
              <Button variant="outline" asChild size="sm">
                <Link href="/products/1">
                  <Edit size={20} />
                </Link>
              </Button>
              <Button variant="destructive" size="sm">
                <Trash size={20} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TicketTable;

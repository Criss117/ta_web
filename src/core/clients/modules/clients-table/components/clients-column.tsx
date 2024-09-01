import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import type { Client } from "@prisma/client";

import { Button, buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/nav";
import { cn } from "@/lib/utils";
import MutateClientContainer from "../../mutate-client/mutate-client.container";

export const clientsColumns: ColumnDef<Client>[] = [
  {
    accessorKey: "fullName",
    header: "Nombre",
  },
  {
    accessorKey: "phone",
    header: "Telefono",
  },
  {
    accessorKey: "balance",
    header: "Balance",
  },
  {
    accessorKey: "creditLimit",
    header: "Limite de credito",
  },
  {
    accessorKey: "address",
    header: "Dirección",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ getValue }) => {
      return new Date(getValue() as Date).toLocaleDateString();
    },
  },
  {
    header: "Acciones",
    id: "actions",
    cell: ({ row }) => {
      const client = row.original;

      return (
        <div className="flex gap-2 z-50">
          <MutateClientContainer
            action="delete"
            ccNumber={client.ccNumber}
            id={client.id}
          />
          <Link
            className={cn("w-1/2", buttonVariants({ variant: "outline" }))}
            href={`${ROUTES.EDIT_CLIENTS}/${client.ccNumber}`}
            onClick={(e) => e.stopPropagation()}
          >
            Editar
          </Link>
        </div>
      );
    },
  },
];

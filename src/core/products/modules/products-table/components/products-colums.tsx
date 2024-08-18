import Link from "next/link";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/nav";
import { cn, formatCurrency } from "@/lib/utils";
import MutateProductContainer from "../../mutate-product/mutate-product.container";

export const productsColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "barcode",
    header: "Código de Barras",
  },
  {
    accessorKey: "description",
    header: "Descripción",
  },
  {
    accessorKey: "costPrice",
    header: "Costo",
    cell: ({ row }) => {
      return formatCurrency(row.getValue("costPrice"));
    },
  },
  {
    accessorKey: "salePrice",
    header: "Precio de venta",
    cell: ({ row }) => {
      return formatCurrency(row.getValue("salePrice"));
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "minStock",
    header: "Min Stock",
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
      const product = row.original;

      return (
        <div className="flex gap-2">
          <MutateProductContainer
            barcode={product.barcode}
            action="delete"
            id={product.id}
          />
          <Link
            className={cn("w-1/2", buttonVariants({ variant: "outline" }))}
            href={`${ROUTES.EDIT_PRODUCTS}/${product.barcode}`}
          >
            Editar
          </Link>
        </div>
      );
    },
  },
];

import { Button, buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/nav";
import { cn, formatCurrency } from "@/lib/utils";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

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
          <Button variant="destructive" className="w-1/2">
            Eliminar
          </Button>
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

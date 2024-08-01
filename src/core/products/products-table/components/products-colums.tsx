import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const productsColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "barcode",
    header: "Código de barras",
  },
  {
    accessorKey: "description",
    header: "Descripción",
  },
  {
    accessorKey: "costPrice",
    header: "Costo",
  },
  {
    accessorKey: "salePrice",
    header: "Precio de venta",
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
          <Button variant="outline" className="w-1/2">
            Editar
          </Button>
        </div>
      );
    },
  },
];

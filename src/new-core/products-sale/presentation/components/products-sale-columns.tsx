import { ColumnDef } from "@tanstack/react-table";
import ProductSaleEntity from "../../domain/entities/product-sale.entity";

export const productsSaleColumns: ColumnDef<ProductSaleEntity>[] = [
  {
    accessorKey: "description",
    header: "Descripción del producto",
    cell: ({ row }) => {
      const description = row.original.product?.description;

      return description ? description : "Sin descripción";
    },
  },
  {
    accessorKey: "salePrice",
    header: "Precio de venta",
  },
  {
    accessorKey: "quantity",
    header: "Cantidad",
  },
  {
    accessorKey: "subTotal",
    header: "Subtotal",
  },
];

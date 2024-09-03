import type { ProductSaleClient } from "@/core/products-sale/models/type";
import { ColumnDef } from "@tanstack/react-table";

export const productsSaleColumns: ColumnDef<ProductSaleClient>[] = [
  {
    accessorKey: "description",
    header: "Descripción del producto",
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

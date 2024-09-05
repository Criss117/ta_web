"use client";

import useFindProductsSale from "../../hooks/use.find-prod-sales";
import TableComponent from "@/core/table/components/table-component";
import { productsSaleColumns } from "./components/products-sale-columns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

interface Props {
  ticketId: number;
  ccNumber: string;
  total: number;
}

const ProductsSaleTableContainer = ({ ticketId, ccNumber, total }: Props) => {
  const { findProductsSaleQuery, productsSales } = useFindProductsSale({
    ticketId,
    ccNumber,
  });

  return (
    <ScrollArea className="min-h-[80%] h-[80%] max-h-[80%]">
      <TableComponent
        data={productsSales || []}
        offset={productsSales?.length || 5}
        isFetching={findProductsSaleQuery.isFetching}
        columns={productsSaleColumns}
      />
    </ScrollArea>
  );
};

export default ProductsSaleTableContainer;

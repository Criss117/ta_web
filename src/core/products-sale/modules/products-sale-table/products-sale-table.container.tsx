"use client";

import { useEffect } from "react";
import useFindProductsSale from "../../hooks/use.find-prod-sales";
import TableComponent from "@/core/table/components/table-component";
import { productsSaleColumns } from "./components/products-sale-columns";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  ticketId: number;
}

const ProductsSaleTableContainer = ({ ticketId }: Props) => {
  const { findProductsSaleQuery, productsSales } = useFindProductsSale({
    ticketId,
  });

  return (
    <ScrollArea className="min-h-[80%] h-[80%] max-h-[80%]">
      <TableComponent
        data={productsSales || []}
        offset={productsSales?.length || 5}
        isFetching={findProductsSaleQuery.isFetching}
        columns={productsSaleColumns}
        navigateTo={"products-sale/"}
      />
    </ScrollArea>
  );
};

export default ProductsSaleTableContainer;

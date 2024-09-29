"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import useFindByTicket from "../../application/hooks/use.find-by.ticket";
import { productsSaleColumns } from "./products-sale-columns";
import TableComponent from "@Core/table/components/table-component";

interface Props {
  ticketId: number;
  clientId: number;
}

const ProductsSaleTable = ({ clientId, ticketId }: Props) => {
  const { data, isFetching } = useFindByTicket({
    clientId,
    ticketId,
  });

  return (
    <ScrollArea className="min-h-[80%] h-[80%] max-h-[80%]">
      <TableComponent
        data={data || []}
        offset={data?.length || 5}
        isFetching={isFetching}
        columns={productsSaleColumns}
      />
    </ScrollArea>
  );
};

export default ProductsSaleTable;

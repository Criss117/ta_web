"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import useFindByTicket from "../../application/hooks/use.find-by.ticket";
import { productsSaleColumns } from "./products-sale-columns";
import TableComponent from "@/core/table/components/table-component";

interface Props {
  ticketId: number;
  clientId: number;
}

const ProductsSaleTable = ({ clientId, ticketId }: Props) => {
  const { useFindTicketQuery } = useFindByTicket({ clientId, ticketId });

  return (
    <ScrollArea className="min-h-[80%] h-[80%] max-h-[80%]">
      <TableComponent
        data={useFindTicketQuery.data || []}
        offset={useFindTicketQuery.data?.length || 5}
        isFetching={useFindTicketQuery.isFetching}
        columns={productsSaleColumns}
      />
    </ScrollArea>
  );
};

export default ProductsSaleTable;

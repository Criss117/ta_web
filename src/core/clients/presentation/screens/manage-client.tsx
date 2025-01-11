"use client";

import useFindClient from "../../application/hooks/use.find-client";
import TicketsProductsList from "@Core/tickets/presentation/components/tickets-list/tickets-products-list";

interface Props {
  ccNumber: string;
}

const ManageClient = ({ ccNumber }: Props) => {
  const { data } = useFindClient(ccNumber, true);

  return (
    <TicketsProductsList
      ccNumber={ccNumber}
      clientId={data?.id || ""}
      tickets={data?.tickets || []}
    />
  );
};

export default ManageClient;

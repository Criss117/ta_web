import type { Metadata } from "next";

import { TITLES } from "@/lib/constants/metadata";

import TicketsTableContainer from "@/core/tickets_table/tickets-table.container";

export const metadata: Metadata = {
  title: TITLES.SALES,
};

const SalesPage = () => {
  return (
    <>
      <TicketsTableContainer />
    </>
  );
};

export default SalesPage;

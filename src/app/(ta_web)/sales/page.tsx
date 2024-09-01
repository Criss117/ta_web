import type { Metadata } from "next";

import { TITLES } from "@/lib/constants/metadata";
import TicketsContainer from "@/core/tickets/tickets.container";

export const metadata: Metadata = {
  title: TITLES.SALES,
};

const SalesPage = () => {
  return <TicketsContainer />;
};

export default SalesPage;

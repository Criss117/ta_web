import type { Metadata } from "next";

import { TITLES } from "@/lib/constants/metadata";
import TicketsScreen from "@Core/tickets/presentation/screens/tickets.screen";

export const metadata: Metadata = {
  title: TITLES.SALES,
};

const TicketsPage = () => {
  return <TicketsScreen />;
};

export default TicketsPage;

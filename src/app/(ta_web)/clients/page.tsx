import type { Metadata } from "next";

import { TITLES } from "@/lib/constants/metadata";

export const metadata: Metadata = {
  title: TITLES.CLIENTS,
};

const ClientsPage = () => {
  return <div>ClientsPage</div>;
};

export default ClientsPage;

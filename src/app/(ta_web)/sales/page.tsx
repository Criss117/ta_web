import type { Metadata } from "next";

import { TITLES } from "@/lib/constants/metadata";
import SalesContainer from "@/core/products/sales/sales.container";

export const metadata: Metadata = {
  title: TITLES.SALES,
};

const SalesPage = () => {
  return <SalesContainer />;
};

export default SalesPage;

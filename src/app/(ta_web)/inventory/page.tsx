import { TITLES } from "@/lib/constants/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: TITLES.INVENTORY,
};

const InventoryPage = () => {
  return <div>InventoryPage</div>;
};

export default InventoryPage;

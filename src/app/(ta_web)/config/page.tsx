import type { Metadata } from "next";

import { TITLES } from "@/lib/constants/metadata";

export const metadata: Metadata = {
  title: TITLES.CONFIG,
};

const ConfigPages = () => {
  return <div className="bg-green-400 flex-grow">div</div>;
};

export default ConfigPages;

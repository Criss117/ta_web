import type { Metadata } from "next";

import { TITLES } from "@/lib/constants/metadata";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: TITLES.CONFIG,
};

const ConfigPages = async () => {
  const prismaMetricts = await prisma.$metrics.json();

  return (
    <div className="bg-green-400 flex-grow">
      <pre>
        <code>{JSON.stringify(prismaMetricts, null, 2)}</code>
      </pre>
    </div>
  );
};

export default ConfigPages;

import React, { PropsWithChildren } from "react";
import { Metadata } from "next";

import SectionHeader from "@/components/ui/section-header";
import { TITLES } from "@/lib/constants/metadata";

export const metadata: Metadata = {
  title: TITLES.CLIENTS,
};

const ClientsLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <SectionHeader title={TITLES.CLIENTS} />
      {children}
    </>
  );
};

export default ClientsLayout;

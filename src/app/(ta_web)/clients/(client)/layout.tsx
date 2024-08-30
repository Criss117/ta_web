import { Metadata } from "next";
import { PropsWithChildren } from "react";
import { TITLES } from "@/lib/constants/metadata";
import SectionHeader from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: TITLES.CLIENT,
};

const ClientLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <SectionHeader title={TITLES.CLIENT} />
      {children}
    </>
  );
};

export default ClientLayout;

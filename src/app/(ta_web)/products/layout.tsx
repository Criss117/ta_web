import React, { PropsWithChildren } from "react";

import SectionHeader from "@/components/ui/section-header";
import { TITLES } from "@/lib/constants/metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: TITLES.PRODUCTS,
};

const ProductsLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <SectionHeader title={TITLES.PRODUCTS} />
      {children}
    </>
  );
};

export default ProductsLayout;

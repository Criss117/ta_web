import { PropsWithChildren } from "react";
import type { Metadata } from "next";

import NavBar from "@/components/ui/navbar";
import { TITLES } from "@/lib/constants/metadata";
import { Separator } from "@/components/ui/separator";
import SectionHeader from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: TITLES.PRODUCTS,
};

const ProductsLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <SectionHeader title={TITLES.PRODUCTS} />
      <div className="w-full flex justify-center flex-col items-center">
        <NavBar variant="products" />
        <Separator />
      </div>
      {children}
    </>
  );
};

export default ProductsLayout;

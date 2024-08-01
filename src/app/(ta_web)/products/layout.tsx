import { PropsWithChildren } from "react";

import SectionHeader from "@/components/ui/section-header";
import { TITLES } from "@/lib/constants/metadata";

const ProductsLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <SectionHeader title={TITLES.PRODUCTS} />
      {children}
    </>
  );
};

export default ProductsLayout;

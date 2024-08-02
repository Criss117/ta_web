import { redirect } from "next/navigation";

import ProductContainer from "@/core/products/products.container";
import { ROUTES } from "@/lib/constants/nav";

interface Props {
  searchParams?: {
    page?: string;
    offset?: string;
  };
}

const ProductPage = ({ searchParams }: Props) => {
  if (!searchParams) {
    redirect(ROUTES.PRODUCTS);
  }

  const { page, offset } = searchParams;

  const pageNumber = Number(page);
  const offsetNumber = Number(offset);

  if (
    pageNumber < 1 ||
    offsetNumber < 5 ||
    offsetNumber > 50 ||
    isNaN(pageNumber) ||
    isNaN(offsetNumber)
  ) {
    redirect(ROUTES.PRODUCTS);
  }

  return (
    <>
      <ProductContainer page={pageNumber} offset={offsetNumber} />
    </>
  );
};

export default ProductPage;

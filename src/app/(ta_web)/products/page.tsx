import { redirect } from "next/navigation";

import { ROUTES } from "@/lib/constants/nav";
import ProductsTableScreen from "@Core/products/presentation/screen/products-table.screen";

interface Props {
  searchParams?: Promise<{
    page?: string;
    offset?: string;
  }>;
}

const ProductPage = async (props: Props) => {
  const searchParams = await props.searchParams;
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

  return <ProductsTableScreen page={pageNumber} offset={offsetNumber} />;
};

export default ProductPage;

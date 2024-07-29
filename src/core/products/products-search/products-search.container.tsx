import { Product } from "@prisma/client";

import SearchBar from "./components/search-bar";

interface Props {
  toEdit?: boolean;
  productsListIds?: string[];
  addToState?: (barcode: string, product?: Product) => void;
}

const ProductsSearchContainer = ({
  toEdit,
  productsListIds,
  addToState,
}: Props) => {
  return (
    <div className="my-2 mx-10">
      <SearchBar
        addToState={addToState}
        productsListIds={productsListIds}
        toEdit={toEdit}
      />
    </div>
  );
};

export default ProductsSearchContainer;

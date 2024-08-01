import { Product } from "@prisma/client";

import SearchBar from "./components/search-bar";

interface Props {
  productsListIds?: string[];
  addToState?: (barcode: string, product?: Product) => void;
}

const ProductSearchContainer = ({ productsListIds, addToState }: Props) => {
  return (
    <div className="mb-5 mx-10">
      <SearchBar addToState={addToState} productsListIds={productsListIds} />
    </div>
  );
};

export default ProductSearchContainer;

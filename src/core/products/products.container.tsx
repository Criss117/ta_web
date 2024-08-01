import ProductSearchContainer from "./product-search/product-search.container";
import ProductTableContainer from "./products-table/products-table.container";

interface Props {
  page: number;
  offset: number;
}

const ProductContainer = ({ page, offset }: Props) => {
  return (
    <div className="border mt-10 mx-5 py-10 rounded-xl">
      <ProductSearchContainer />
      <ProductTableContainer page={page} offset={offset} />
    </div>
  );
};

export default ProductContainer;

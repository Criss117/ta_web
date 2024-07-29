import ProductsSearchContainer from "../products-search/products-search.container";
import ProductForm from "./components/product-form";

interface Props {
  id?: string;
  onPage: "create" | "edit";
}

function ProductFormContainer({ id, onPage }: Props) {
  if (!id && onPage === "edit") return <ProductsSearchContainer />;

  if (id && onPage === "edit") return <ProductForm id={id} onPage={onPage} />;

  if (onPage === "edit") return <ProductForm onPage={onPage} />;

  return <ProductForm onPage={onPage} />;
}

export default ProductFormContainer;

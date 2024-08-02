import CreateProductContainer from "./create-product/create-product.container";
import EditProductContainer from "./edit-product/edit-product.container";

interface Props {
  barcode?: string;
  action: "create" | "edit";
}

const MutateProductContainer = ({ barcode, action }: Props) => {
  if (action === "create") {
    return <CreateProductContainer />;
  }

  if (barcode && action === "edit") {
    return <EditProductContainer barcode={barcode} />;
  }

  return null;
};

export default MutateProductContainer;

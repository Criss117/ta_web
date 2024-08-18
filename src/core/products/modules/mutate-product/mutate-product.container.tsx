import DeleteProductContainer from "./modules/delete-product/delete-product.container";
import EditProductContainer from "./modules/edit-product/edit-product.container";
import CreateProductContainer from "./modules/create-product/create-product.container";

interface Props {
  id?: number;
  barcode?: string;
  action: "create" | "edit" | "delete";
}

const MutateProductContainer = ({ id, barcode, action }: Props) => {
  if (action === "create") {
    return <CreateProductContainer />;
  }

  if (barcode && action === "edit") {
    return <EditProductContainer barcode={barcode} />;
  }

  if (barcode && action === "delete" && id) {
    return <DeleteProductContainer barcode={barcode} id={id} />;
  }

  return null;
};

export default MutateProductContainer;

import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { ProductToEditAdapter } from "../adapters/product-edit.adapter";
import { PRODUCT_FORM_MESSAGES } from "@/lib/messages/product.messages";
import { ProductForm } from "../../../models/types";
import { editProductAction } from "../actions/edit-product.action";

async function editProduct(product: ProductForm) {
  const adaptedProduct = ProductToEditAdapter.adapt(product);

  const res = await editProductAction(adaptedProduct);

  return res;
}

const useEditProduct = () => {
  const editProductMutation = useMutation({
    mutationFn: editProduct,
    onSuccess: (res) => {
      if (res.error) {
        toast({
          variant: "destructive",
          title: PRODUCT_FORM_MESSAGES.ERROR_TITLE,
          description: res.error,
        });
        return;
      }

      toast({
        title: PRODUCT_FORM_MESSAGES.SUCCESS,
      });
    },
  });

  const mutate = (product: ProductForm) => {
    editProductMutation.mutate(product);
  };
  return { editProductMutation, mutate };
};

export default useEditProduct;

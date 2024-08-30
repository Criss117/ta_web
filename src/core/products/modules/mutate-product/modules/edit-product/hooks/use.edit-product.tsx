import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { ProductToEditAdapter } from "../adapters/product-edit.adapter";
import { PRODUCT_FORM_MESSAGES } from "@/lib/messages/product.messages";
import { ProductForm } from "../../../models/types";
import { editProductAction } from "../actions/edit-product.action";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/nav";
import { Product } from "@prisma/client";

async function editProduct(product: ProductForm) {
  const adaptedProduct = ProductToEditAdapter.adapt(product);

  const res = await editProductAction(adaptedProduct);

  return res;
}

const useEditProduct = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const editProductMutation = useMutation({
    mutationFn: editProduct,
    onSuccess: async (res) => {
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

      await queryClient.invalidateQueries({
        queryKey: ["product", res?.data?.barcode],
      });

      router.push(ROUTES.PRODUCTS);
    },
  });

  const mutate = (product: ProductForm) => {
    editProductMutation.mutate(product);
  };
  return { editProductMutation, mutate };
};

export default useEditProduct;

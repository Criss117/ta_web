"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { PRODUCT_FORM_MESSAGES } from "@/lib/messages/product.messages";
import { deleteProductAction } from "../actions/delete-product.action";

async function deleteProduct({ barcode, id }: { barcode: string; id: number }) {
  const res = await deleteProductAction(barcode, id);

  return res;
}

const useDeleteProduct = () => {
  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
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

  const mutate = ({ barcode, id }: { barcode: string; id: number }) => {
    deleteProductMutation.mutate({ barcode, id });
  };

  return { deleteProductMutation, mutate };
};

export default useDeleteProduct;

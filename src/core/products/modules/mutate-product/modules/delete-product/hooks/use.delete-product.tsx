"use client";

import { useMutation } from "@tanstack/react-query";
import { DeleteProductService } from "../services/delete-product.service";
import { toast } from "@/components/ui/use-toast";
import { PRODUCT_FORM_MESSAGES } from "@/lib/messages/product.messages";

async function deleteProduct({ barcode, id }: { barcode: string; id: number }) {
  const deleteProductService = new DeleteProductService(barcode, id);

  const res = await deleteProductService.execute();

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

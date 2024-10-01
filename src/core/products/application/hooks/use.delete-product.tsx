"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import ProductsUseCasesfactory from "../../composition-root/products.usecases.factory";
import { toast } from "@/components/ui/use-toast";
import { PRODUCT_FORM_MESSAGES } from "@/lib/messages/product.messages";
import usePageableState from "@Core/common/state/pageable.state";

async function deleteProduct(id: string) {
  const deleteProductUseCase = ProductsUseCasesfactory.createDeleteProduct();

  return await deleteProductUseCase.execute(id);
}

const useDeleteProduct = () => {
  const { query, page, offset } = usePageableState();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (response) => {
      if (!response || response.error) {
        toast({
          variant: "destructive",
          title: PRODUCT_FORM_MESSAGES.ERROR_TITLE,
          description: response.error || "Error al eliminar el producto",
        });

        return;
      }

      toast({
        title: PRODUCT_FORM_MESSAGES.DELETED_SUCCESS,
      });

      queryClient.refetchQueries({
        queryKey: ["products", page - 1, offset, query || "all"],
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: PRODUCT_FORM_MESSAGES.ERROR_TITLE,
        description: "Error al eliminar el producto",
      });
    },
  });

  const mutate = (id: string) => {
    mutation.mutate(id);
  };

  return {
    mutation,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error?.message || "",
    data: mutation.data,
    mutate,
  };
};

export default useDeleteProduct;

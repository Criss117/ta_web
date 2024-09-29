"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ROUTES } from "@/lib/constants/nav";
import { toast } from "@/components/ui/use-toast";
import { errorMessage } from "@Core/common/lib/error-message";
import { PRODUCT_FORM_MESSAGES } from "@/lib/messages/product.messages";

import type { ProductFormDto } from "../models/type";
import ProductMapper from "../mappers/product.mapper";
import ProductsUseCasesfactory from "../../composition-root/products.usecases.factory";

async function editProduct(product: ProductFormDto) {
  const editProductUseCase = ProductsUseCasesfactory.createEditProduct();

  return await editProductUseCase.execute(ProductMapper.toDomain(product));
}

const useEditProduct = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const editProductMutation = useMutation({
    mutationFn: editProduct,
    onSuccess: async (data) => {
      toast({
        title: PRODUCT_FORM_MESSAGES.SUCCESS,
      });

      await queryClient.invalidateQueries({
        queryKey: ["product", data?.barcode],
      });

      router.push(ROUTES.PRODUCTS);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: PRODUCT_FORM_MESSAGES.ERROR_TITLE,
        description: errorMessage(error.message),
      });
    },
  });

  const mutate = (product: ProductFormDto) => {
    editProductMutation.mutate(product);
  };

  return {
    editProductMutation,
    isError: editProductMutation.isError,
    isPending: editProductMutation.isPending,
    error: editProductMutation.error,
    data: editProductMutation.data,
    mutate,
  };
};

export default useEditProduct;

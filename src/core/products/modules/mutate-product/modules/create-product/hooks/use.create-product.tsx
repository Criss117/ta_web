"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

import { PRODUCT_FORM_MESSAGES } from "@/lib/messages/product.messages";

import { ProductForm } from "../../../models/types";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/nav";
import { createProductAction } from "../actions/create-product.action";

async function createProduct(product: ProductForm) {
  const res = await createProductAction(product);
  return res;
}

const useCreateProduct = () => {
  const router = useRouter();
  const createProductMutation = useMutation({
    mutationFn: createProduct,
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
      router.push(ROUTES.PRODUCTS);
    },
  });

  const mutate = (product: ProductForm) => {
    createProductMutation.mutate(product);
  };

  return { createProductMutation, mutate };
};

export default useCreateProduct;

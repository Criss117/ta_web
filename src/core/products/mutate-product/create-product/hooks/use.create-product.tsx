"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

import { PRODUCT_FORM_MESSAGES } from "@/lib/messages/product.messages";

import { ProductForm } from "../../models/types";
import { CreateProductService } from "../services/create-product.service";

async function createProduct(product: ProductForm) {
  const createProduct = new CreateProductService(product);

  const res = await createProduct.execute();

  return res;
}

const useCreateProduct = () => {
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
    },
  });

  const mutate = (product: ProductForm) => {
    createProductMutation.mutate(product);
  };

  return { createProductMutation, mutate };
};

export default useCreateProduct;

"use client";

import { toast } from "@/components/ui/use-toast";
import { PRODUCT_FORM_MESSAGES } from "@/lib/messages/product.messages";
import { useMutation } from "@tanstack/react-query";
import { MutateProductReturnType, ProductForm } from "../models/types";

interface Props {
  mutationFn: (product: ProductForm) => Promise<MutateProductReturnType>;
  form: any;
}

const useProductFormMutation = ({ form, mutationFn }: Props) => {
  const mutation = useMutation({
    mutationFn,
    onSuccess: (res) => {
      if (res.error) {
        toast({
          variant: "destructive",
          title: PRODUCT_FORM_MESSAGES.ERROR_TITLE,
          description: res.error,
        });
        return;
      }

      form.reset();

      toast({
        title: PRODUCT_FORM_MESSAGES.SUCCESS,
      });
    },
  });

  return mutation;
};

export default useProductFormMutation;

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { toast } from "@/components/ui/use-toast";
import { ROUTES } from "@/lib/constants/nav";
import {
  CLIENT_FORM_MESSAGES,
  PRODUCT_FORM_MESSAGES,
} from "@/lib/messages/product.messages";

import type { ProductFormDto } from "../models/type";
import ProductMapper from "../mappers/product.mapper";
import ProductsUseCasesfactory from "../../composition-root/products.usecases.factory";

async function createProduct(product: ProductFormDto) {
  const createPorductUseCase = ProductsUseCasesfactory.createCreateProduct();

  const productEntity = ProductMapper.toDomain(product);

  return await createPorductUseCase.execute(productEntity);
}

const useCreateProduct = () => {
  const router = useRouter();

  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (response) => {
      if (!response || response.error) {
        toast({
          variant: "destructive",
          title: CLIENT_FORM_MESSAGES.ERROR_TITLE,
          description: response.error || "Error al crear el producto",
        });
        return;
      }

      toast({
        title: PRODUCT_FORM_MESSAGES.SUCCESS,
      });
      router.push(ROUTES.PRODUCTS);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: CLIENT_FORM_MESSAGES.ERROR_TITLE,
        description: "Error al crear el producto",
      });
    },
  });

  const mutate = (product: ProductFormDto) => {
    createProductMutation.mutate(product);
  };

  return { createProductMutation, mutate };
};

export default useCreateProduct;

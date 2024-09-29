"use client";

import { useQuery } from "@tanstack/react-query";
import ProductsUseCasesfactory from "../../composition-root/products.usecases.factory";

async function findProduct(barcode: string) {
  if (!barcode.length) {
    return null;
  }

  const findProductUseCase = ProductsUseCasesfactory.createFindProduct();

  return await findProductUseCase.execute(barcode);
}

const useFindProduct = (barcode: string) => {
  const findProductQuery = useQuery({
    queryKey: ["product", barcode],
    queryFn: () => findProduct(barcode),
  });

  return {
    isSuccess: findProductQuery.isSuccess,
    isError: findProductQuery.isError,
    isFetching: findProductQuery.isFetching,
    isPending: findProductQuery.isPending,
    error: findProductQuery.error,
    data: findProductQuery.data,
  };
};

export default useFindProduct;

"use client";
import { useQuery } from "@tanstack/react-query";

import type { Filters } from "@Core/common/models/types";

import ProductsUseCasesfactory from "../../composition-root/products.usecases.factory";

interface Props {
  page?: number;
  offset?: number;
  filters?: Filters;
}

async function findProducts(page: number, offset: number, filters?: Filters) {
  if (page < 0) return;
  const findProductsUseCase = ProductsUseCasesfactory.createFindManyUseCase();

  return await findProductsUseCase.execute(offset, page, filters);
}

const useProductsTable = ({ page = 1, offset = 10, filters }: Props) => {
  const findProductsQuery = useQuery({
    queryKey: [
      "products",
      page < 1 ? 0 : page - 1,
      offset,
      filters?.query || "all",
    ],
    queryFn: () => findProducts(page < 1 ? 0 : page - 1, offset, filters),
    refetchOnWindowFocus: false,
  });

  return { data: findProductsQuery.data?.data, findProductsQuery };
};

export default useProductsTable;

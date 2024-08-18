import { useQuery } from "@tanstack/react-query";
import { FindProductsService } from "../services/find-products.service";
import type { Filters } from "@/core/models/types";

interface Props {
  page?: number;
  offset?: number;
  filters?: Filters;
}

async function findProducts({
  page,
  offset,
  filters,
}: {
  page: number;
  offset: number;
  filters?: Filters;
}) {
  const findProducts = new FindProductsService(page, offset, filters);
  return await findProducts.execute();
}

const useProductTable = ({ page = 1, offset = 10, filters }: Props) => {
  const findProductsQuery = useQuery({
    queryKey: ["products", page - 1, offset, filters?.query || "all"],
    queryFn: () => findProducts({ page: page - 1, offset, filters }),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  return { findProductsQuery };
};

export default useProductTable;

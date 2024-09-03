import { useQuery } from "@tanstack/react-query";
import type { Product } from "@prisma/client";
import type {
  Filters,
  FindEntitiesReturnType,
} from "@/core/common/models/types";
import { findProductsAction } from "../actions/find-products.action";

interface Props {
  page?: number;
  offset?: number;
  filters?: Filters;
}

const useProductTable = ({ page = 1, offset = 10, filters }: Props) => {
  const findProductsQuery = useQuery({
    queryKey: ["products", page - 1, offset, filters?.query || "all"],
    queryFn: () => findProductsAction({ page: page - 1, offset, filters }),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  return { findProductsQuery };
};

export default useProductTable;

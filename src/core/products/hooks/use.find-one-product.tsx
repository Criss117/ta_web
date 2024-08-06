import { useQuery } from "@tanstack/react-query";
import type { MutateProductReturnType } from "../mutate-product/models/types";
import { FindOneProductService } from "../services/find-one-product.service";

async function findOneProduct(
  barcode: string
): Promise<MutateProductReturnType> {
  if (!barcode) {
    return {
      data: null,
    };
  }

  const findProductService = new FindOneProductService(barcode);

  const res = await findProductService.execute();

  return res;
}

const useFindOneProduct = (barcode: string, enabled = true) => {
  const findOneProductQuery = useQuery({
    queryKey: ["product", barcode],
    queryFn: () => findOneProduct(barcode),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const executeQuery = () => {
    if (findOneProductQuery.isPending) return;
    findOneProductQuery.refetch();
  };

  return { findOneProductQuery, executeQuery };
};

export default useFindOneProduct;

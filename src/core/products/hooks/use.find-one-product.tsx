import { useQuery } from "@tanstack/react-query";
import { MutateProductReturnType } from "../modules/mutate-product/models/types";
import { findOneProductAction } from "../actions/find-one-product.action";

async function findOneProduct(
  barcode: string
): Promise<MutateProductReturnType> {
  if (!barcode) {
    return {
      data: null,
    };
  }

  const res = await findOneProductAction(barcode);

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

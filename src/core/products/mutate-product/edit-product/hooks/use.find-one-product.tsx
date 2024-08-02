import { useQuery } from "@tanstack/react-query";
import { FindOneProductService } from "../../services/find-one-product.service";
import type { MutateProductReturnType } from "../../models/types";

async function findOneProduct(
  barcode: string
): Promise<MutateProductReturnType> {
  const findProductService = new FindOneProductService(barcode);

  const res = await findProductService.execute();

  return res;
}

const useFindOneProduct = (barcode: string) => {
  const findOneProductQuery = useQuery({
    queryKey: ["product", barcode],
    queryFn: () => findOneProduct(barcode),
  });

  const executeQuery = () => {
    if (findOneProductQuery.isPending) return;
    findOneProductQuery.refetch();
  };

  return { findOneProductQuery, executeQuery };
};

export default useFindOneProduct;

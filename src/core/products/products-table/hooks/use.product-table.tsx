import { useQuery } from "@tanstack/react-query";
import { FindProductsService } from "../services/find-products.service";

interface Props {
  page?: number;
  offset?: number;
}

async function findProducts({
  page,
  offset,
}: {
  page: number;
  offset: number;
}) {
  const findProducts = new FindProductsService(page, offset);
  return await findProducts.execute();
}

const useProductTable = ({ page = 1, offset = 10 }: Props) => {
  const findProductsQuery = useQuery({
    queryKey: ["products", page - 1, offset],
    queryFn: () => findProducts({ page: page - 1, offset }),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  return { findProductsQuery };
};

export default useProductTable;

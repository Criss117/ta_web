import { useQueryClient } from "@tanstack/react-query";
import ProductEntity from "../../domain/entities/product.entity";
import { CommonResponse } from "@/core/common/models/types";

const useProductsQuery = () => {
  const queryClient = useQueryClient();

  const editProduct = (product: CommonResponse<ProductEntity | null>) => {
    if (!product || !product.data) return;

    queryClient.setQueryData(["product", product.data?.barcode], product);
  };

  return {
    editProduct,
  };
};

export default useProductsQuery;

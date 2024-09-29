"use client";

import { useEffect, useMemo } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import useProductsTable from "@Core/products/application/hooks/use.products-table";
import useSelectedProductState from "@Core/products/application/state/selected-product.state";

interface Props {
  query: string;
}

const ProductsList = ({ query }: Props) => {
  const { selectedProduct, setSelectedProduct } = useSelectedProductState();
  const { page, offset } = useMemo(() => ({ page: 0, offset: 20 }), []);

  const { data, findProductsQuery } = useProductsTable({
    page,
    offset,
    filters: { query },
  });

  useEffect(() => {
    if (page <= 0) return;
    findProductsQuery.refetch();
    setSelectedProduct(null);
  }, [page, offset, query]);

  return (
    <ScrollArea className="h-96 w-full border border-black">
      <ul className="space-y-2 mt-2">
        {data?.items?.map((product, index) => (
          <li
            key={product.id}
            className={cn(
              "flex gap-x-5 justify-between px-3 hover:cursor-pointer hover:bg-lightbg-300 transition-all",
              index % 2 === 0 ? "bg-lightbg-300/50" : "bg-lightbg-200",
              selectedProduct?.id === product.id &&
                "bg-lightprimary-300 hover:bg-lightprimary-300/90 text-white"
            )}
            onClick={() => {
              if (selectedProduct?.id === product.id) {
                setSelectedProduct(null);
                return;
              }
              setSelectedProduct(product);
            }}
          >
            <p className="text-center">{product.barcode}</p>
            <p className="text-center">{product.description}</p>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
};

export default ProductsList;

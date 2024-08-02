import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import OffSetSelector from "./offset-selector";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface Props {
  page: number;
  offset: number;
  productCount: {
    totalProducts: number;
    totalPage: number;
  };
}

const ProductsTablePag = ({ page, offset, productCount }: Props) => {
  const { totalPage } = productCount;

  const prevPage = page > 1 ? page - 1 : 1;
  const nextPage = page < totalPage ? page + 1 : totalPage;

  const disablePrevButton = page === 1 || totalPage === 0;
  const disableNextButton = page === totalPage;

  const outLineButtonClass = useMemo(() => {
    return `${buttonVariants({ variant: "outline" })}`;
  }, []);

  return (
    <div className="flex justify-end gap-x-5 my-2">
      <div className="flex justify-center items-center gap-x-10">
        <p>
          Página {page} de {totalPage}
        </p>
        <OffSetSelector currentOffset={offset} />
      </div>

      <div>
        {/* {first page */}
        <Link
          href={disablePrevButton ? "#" : `?page=1&offset=${offset}`}
          className={cn(
            outLineButtonClass,
            disablePrevButton && "cursor-default opacity-50 hover:bg-background"
          )}
        >
          <span>
            <ChevronsLeft size={20} />
          </span>
        </Link>

        {/* previous page */}
        <Link
          href={`?page=${prevPage}&offset=${offset}`}
          className={cn(
            outLineButtonClass,
            disablePrevButton && "cursor-default opacity-50 hover:bg-background"
          )}
        >
          <span>
            <ChevronLeft size={20} />
          </span>
        </Link>

        {/* next page */}
        <Link
          href={`?page=${nextPage}&offset=${offset}`}
          className={cn(
            outLineButtonClass,
            disableNextButton && "cursor-default opacity-50 hover:bg-background"
          )}
        >
          <span>
            <ChevronRight size={20} />
          </span>
        </Link>

        {/* last page */}
        <Link
          href={`?page=${totalPage}&offset=${offset}`}
          className={cn(
            outLineButtonClass,
            disableNextButton && "cursor-default opacity-50 hover:bg-background"
          )}
        >
          <span>
            <ChevronsRight size={20} />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ProductsTablePag;

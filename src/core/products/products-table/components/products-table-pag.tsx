import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import OffSetSelector from "./offset-selector";

interface Props {
  page: number;
  offset: number;
  productCount: {
    totalProducts: number;
    totalPage: number;
  };
}
const ProductsTablePag = ({ page, offset, productCount }: Props) => {
  const { totalProducts, totalPage } = productCount;

  const nextPage = page < totalPage ? page + 1 : totalPage;
  const prevPage = page > 1 ? page - 1 : 1;

  return (
    <div className="flex justify-end gap-x-5 my-2">
      <div className="flex justify-center items-center gap-x-10">
        <p>
          Página {page} de {totalPage}
        </p>
        <OffSetSelector currentOffset={offset} />
      </div>

      <div>
        <Link href={`?page=1&offset=${offset}`}>
          <Button asChild variant="outline">
            <span>
              <ChevronsLeft size={20} />
            </span>
          </Button>
        </Link>
        <Link href={`?page=${prevPage}&offset=${offset}`}>
          <Button asChild variant="outline">
            <span>
              <ChevronLeft size={20} />
            </span>
          </Button>
        </Link>
        <Link href={`?page=${nextPage}&offset=${offset}`}>
          <Button asChild variant="outline">
            <span>
              <ChevronRight size={20} />
            </span>
          </Button>
        </Link>
        <Link href={`?page=${totalPage}&offset=${offset}`}>
          <Button asChild variant="outline" className="">
            <span>
              <ChevronsRight size={20} />
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductsTablePag;

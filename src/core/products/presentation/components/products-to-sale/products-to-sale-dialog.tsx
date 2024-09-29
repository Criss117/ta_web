"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import SearchBarQuery from "@/components/form/search-bar-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductsList from "./products-list";
import useSelectedProductState from "@Core/products/application/state/selected-product.state";
import ProductEntity from "@Core/products/domain/entities/product.entity";

interface Props {
  onAccept: (selectedProduct: ProductEntity) => void;
}

const ProductsToSaleTable = ({ onAccept }: Props) => {
  const { selectedProduct, clearState } = useSelectedProductState();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleOnAccept = () => {
    if (!selectedProduct) return;

    onAccept(selectedProduct);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      setQuery("");
      clearState();
    }

    return () => {
      setQuery("");
      clearState();
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="space-x-2" variant="outline">
          <Search className="w-4 h-4" />
          <p>Buscar</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-[600px] h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Buscar Producto</DialogTitle>
          <DialogDescription></DialogDescription>
          <SearchBarQuery
            label="Código de barras o descripción"
            searchByQueryFn={setQuery}
          />
        </DialogHeader>
        <ProductsList query={query} />
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button disabled={!selectedProduct} onClick={handleOnAccept}>
            Aceptar
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductsToSaleTable;

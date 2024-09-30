"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ProductSearchSchema } from "@Core/products/application/models/schemas";
import ProductEntity from "@Core/products/domain/entities/product.entity";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useFindProduct from "@Core/products/application/hooks/use.find-product";
import { toast } from "@/components/ui/use-toast";

interface Props {
  onSearch: (product: ProductEntity) => void;
}

const ProductSearchBar = ({ onSearch }: Props) => {
  const [barCode, setBarCode] = useState("");
  const { data, isSuccess } = useFindProduct(barCode);

  const form = useForm<z.infer<typeof ProductSearchSchema>>({
    resolver: zodResolver(ProductSearchSchema),
    defaultValues: {
      barcode: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ProductSearchSchema>) => {
    const { barcode } = values;
    setBarCode(barcode);

    form.reset();
  };

  useEffect(() => {
    if (isSuccess && data != null) {
      onSearch(data);
      setBarCode("");
      return;
    }
    if (!isSuccess && data === null && barCode !== "") {
      toast({
        title: "Error",
        description: "No se encontro el producto",
        variant: "destructive",
      });
    }
  }, [isSuccess, data]);

  return (
    <Form {...form}>
      <form
        className="flex w-2/3 items-end gap-x-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="barcode"
          render={({ field }) => (
            <FormItem className="w-full items-center">
              <FormLabel
                className="text-xl text-lighttext-200"
                htmlFor="barcode"
              >
                Código de Barras:
              </FormLabel>
              <FormControl>
                <Input type="text" id="barcode" {...field} autoFocus />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Agregar Producto</Button>
      </form>
    </Form>
  );
};

export default ProductSearchBar;

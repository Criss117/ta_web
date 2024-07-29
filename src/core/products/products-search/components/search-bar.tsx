"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Product } from "@prisma/client";

import { getProduct } from "../services/products-search.service";
import { ProductSearchSchema } from "../models/schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

interface Props {
  toEdit?: boolean;
  productsListIds?: string[];
  addToState?: (barcode: string, product?: Product) => void;
}

const SearchBar = ({ toEdit, productsListIds, addToState }: Props) => {
  const form = useForm<z.infer<typeof ProductSearchSchema>>({
    resolver: zodResolver(ProductSearchSchema),
    defaultValues: {
      barcode: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ProductSearchSchema>) => {
    const { barcode } = values;

    const existProduct = productsListIds?.find(
      (existBarCode) => existBarCode === barcode
    );

    if (existProduct) {
      addToState?.(existProduct);
      return;
    }

    getProduct({ barcode }).then(({ data }) => {
      if (!data) return;

      console.log(data);
      addToState?.(data.barcode, data);

      form.resetField("barcode");
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-2/3 items-end gap-x-5"
      >
        <FormField
          control={form.control}
          name="barcode"
          render={({ field }) => (
            <FormItem className="w-full items-center">
              <FormLabel className="text-xl text-lighttext-200">
                Código de Barras:
              </FormLabel>
              <FormControl>
                <Input type="text" id="barcode" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="">
          Agregar Producto
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;

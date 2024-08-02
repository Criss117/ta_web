import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { ProductSearchSchema } from "../models/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const SearchBarForm = () => {
  const form = useForm<z.infer<typeof ProductSearchSchema>>({
    resolver: zodResolver(ProductSearchSchema),
    defaultValues: {
      query: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ProductSearchSchema>) => {
    const { query } = values;
  };

  return (
    <Form {...form}>
      <form
        className="flex w-2/3 items-end gap-x-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem className="w-full items-center">
              <FormLabel
                className="text-xl text-lighttext-200"
                htmlFor="barcode"
              >
                Código de Barras o descripción:
              </FormLabel>
              <FormControl>
                <Input type="text" id="barcode" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Buscar Producto</Button>
      </form>
    </Form>
  );
};

export default SearchBarForm;

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { ProductSearchSchema } from "../models/schema";

interface Props {
  searchByBarcodeFn?: (barcode: string) => void;
}

const SearchBarForm = ({ searchByBarcodeFn }: Props) => {
  const form = useForm<z.infer<typeof ProductSearchSchema>>({
    resolver: zodResolver(ProductSearchSchema),
    defaultValues: {
      barcode: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ProductSearchSchema>) => {
    const { barcode } = values;

    searchByBarcodeFn?.(barcode);

    form.reset();
  };

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
                <Input type="text" id="barcode" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Agregar Producto</Button>
      </form>
    </Form>
  );
};

export default SearchBarForm;

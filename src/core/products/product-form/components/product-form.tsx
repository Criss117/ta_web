"use client";

import FormItemInput from "@/components/form/form-item-input";
import { Form, FormField } from "@/components/ui/form";

import { Button } from "@/components/ui/button";

import useFormProduct from "../hooks/use.product-form";

const formItemsText = [
  {
    name: "barcode",
    label: "Código de barras",
    placeholder: "Código de barras",
    type: "text",
  },
  {
    name: "description",
    label: "Descripción",
    placeholder: "Descripción",
    type: "text",
  },
] as const;

const formItemsNumber = [
  {
    name: "costPrice",
    label: "Precio de costo",
    placeholder: "Precio de costo",
    type: "number",
  },
  {
    name: "salePrice",
    label: "Precio de venta",
    placeholder: "Precio de venta",
    type: "number",
  },
  {
    name: "wholesalePrice",
    label: "Precio de mayorista",
    placeholder: "Precio de mayorista",
    type: "number",
  },
] as const;

const formItemsStock = [
  {
    name: "stock",
    label: "Existencia",
    placeholder: "Existencia",
    type: "number",
  },
  {
    name: "minStock",
    label: "Stock minimo",
    placeholder: "Stock minimo",
    type: "number",
  },
] as const;

interface Props {
  id?: string;
  onPage: "create" | "edit";
}

function ProductForm({ id, onPage }: Props) {
  const { form, onSubmit } = useFormProduct({ id, onPage });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-10">
        <fieldset className="space-y-2">
          {formItemsText.map((item) => (
            <FormField
              key={item.name}
              control={form.control}
              name={item.name}
              render={({ field }) => <FormItemInput field={field} {...item} />}
            />
          ))}
        </fieldset>
        <fieldset className="grid grid-cols-3 gap-2">
          {formItemsNumber.map((item) => (
            <FormField
              key={item.name}
              control={form.control}
              name={item.name}
              render={({ field }) => <FormItemInput field={field} {...item} />}
            />
          ))}
        </fieldset>
        <fieldset className="grid grid-cols-3 gap-2">
          {formItemsStock.map((item) => (
            <FormField
              key={item.name}
              control={form.control}
              name={item.name}
              render={({ field }) => <FormItemInput field={field} {...item} />}
            />
          ))}
        </fieldset>

        <Button type="submit" className="w-full">
          Crear Producto
        </Button>
      </form>
    </Form>
  );
}

export default ProductForm;

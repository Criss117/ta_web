"use client";

import { Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import ErrorMessage from "@/components/form/error-message";
import FormItemInput from "@/components/form/form-item-input";

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
  barcode?: string;
  onPage: "create" | "edit";
}

function ProductForm({ barcode, onPage }: Props) {
  const { form, isError, response, isLoading, onSubmit } = useFormProduct({
    barcode,
    onPage,
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-10">
        <ErrorMessage isError={isError} error={response?.error} />
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

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : onPage === "create" ? (
            "Guardar producto"
          ) : (
            "Guardar cambios"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default ProductForm;

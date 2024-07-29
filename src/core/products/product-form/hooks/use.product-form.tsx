"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { ProductFormSchema } from "../models/schema";
import ProductFormService from "../services/product-form.service";
import { useProductFormState } from "../state/product-form.state";
import { CreateProduct } from "../services/create-product.service";

interface Props {
  id?: string;
  onPage: "create" | "edit";
}

function useProductForm({ id, onPage }: Props) {
  const { product, setProduct } = useProductFormState();

  const form = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      barcode: product.barcode,
      description: product.description,
      costPrice: product.costPrice,
      salePrice: product.salePrice,
      wholesalePrice: product.wholesalePrice,
      stock: product.stock,
      minStock: product.minStock,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const errosValidations = ProductFormService.validate(data);

    if (errosValidations.length > 0) {
      errosValidations.map((error) => {
        form.setError(error.field, {
          message: error.message,
        });
      });

      return;
    }
    const createProduct = new CreateProduct(data);

    const res = await createProduct.execute();

    console.log(res);
  });

  return { form, onSubmit };
}

export default useProductForm;

"use client";

import { useForm } from "react-hook-form";

import { EditProductFormSchema, ProductFormSchema } from "../models/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import type { ProductForm } from "../models/types";
import ProductFormService from "../services/product-form.service";

const initialData2 = {
  id: -1,
  barcode: "holaa",
  description: "description",
  costPrice: 100,
  salePrice: 100,
  wholesalePrice: 100,
  stock: 100,
  minStock: 10,
};

const useProductForm = (data?: ProductForm) => {
  const productForm = useForm<ProductForm>({
    resolver: zodResolver(data ? EditProductFormSchema : ProductFormSchema),
    defaultValues: data || {},
  });

  const onSubmit = async (
    values: ProductForm,
    mutationFn: (product: ProductForm) => void
  ) => {
    productForm.clearErrors();

    const errosValidations = ProductFormService.validate(values);

    if (errosValidations.length > 0) {
      errosValidations.map((error) => {
        productForm.setError(error.field, {
          message: error.message,
        });
      });

      return;
    }

    mutationFn(values);
  };

  return { productForm, onSubmit };
};

export default useProductForm;

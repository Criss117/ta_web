"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { ProductFormDto } from "../models/type";
import { EditProductFormSchema, ProductFormSchema } from "../models/schemas";
import ProductFormService from "../services/product-form.service";

const defaultValues: ProductFormDto = {
  barcode: "",
  description: "",
  costPrice: 0,
  salePrice: 0,
  stock: 0,
  wholesalePrice: 0,
  minStock: 0,
};

const useProductForm = (data?: ProductFormDto) => {
  const productForm = useForm<ProductFormDto>({
    resolver: zodResolver(data ? EditProductFormSchema : ProductFormSchema),
    defaultValues: data ? data : defaultValues,
  });

  const onSubmit = async (
    values: ProductFormDto,
    mutationFn: (product: ProductFormDto) => void
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

"use client";

import { z } from "zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateProduct } from "../services/create-product.service";
import ProductFormService from "../services/product-form.service";
import { useProductFormState } from "../state/product-form.state";
import { ProductFormSchema } from "../models/schema";
import type { ProductForm } from "../models/types";
import { UpdateProduct } from "../services/update-product.service";
import { getProduct } from "../../products-search/services/products-search.service";
import useProductFormMutation from "./use.product-form.mutation";
import { useQuery } from "@tanstack/react-query";

interface Props {
  barcode?: string;
  onPage: "create" | "edit";
}

async function createProductMutation(product: ProductForm) {
  const createProduct = new CreateProduct(product);

  const res = await createProduct.execute();

  return res;
}

async function updateProductMutation(product: ProductForm) {
  const updateProduct = new UpdateProduct(product);

  const res = await updateProduct.execute();

  return res;
}

function useProductForm({ barcode, onPage }: Props) {
  const { product, productToEdit, setProductToEdit } = useProductFormState();

  const editingProduct = useMemo(
    () => (barcode && onPage === "edit" && barcode !== "" ? true : false),
    [barcode, onPage]
  );

  const form = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      barcode: editingProduct ? productToEdit.barcode : product.barcode,
      description: editingProduct
        ? productToEdit.description
        : product.description,
      costPrice: editingProduct ? productToEdit.costPrice : product.costPrice,
      salePrice: editingProduct ? productToEdit.salePrice : product.salePrice,
      wholesalePrice: editingProduct
        ? productToEdit.wholesalePrice
        : product.wholesalePrice,
      stock: editingProduct ? productToEdit.stock : product.stock,
      minStock: editingProduct ? productToEdit.minStock : product.minStock,
    },
  });

  const mutation = useProductFormMutation({
    mutationFn: editingProduct ? updateProductMutation : createProductMutation,
    form,
  });

  const query = useQuery({
    queryKey: ["product", barcode],
    queryFn: () => {
      if (!barcode) return;

      return getProduct({ barcode });
    },
    refetchOnWindowFocus: false,
    enabled: false,
  });

  useEffect(() => {
    if (
      barcode &&
      (productToEdit.barcode !== barcode || productToEdit.barcode === "")
    ) {
      query.refetch().then(({ data: res }) => {
        if (!res) return;

        if (res.data) {
          setProductToEdit(res.data.barcode, res.data);

          form.reset({
            barcode: res.data.barcode,
            description: res.data.description,
            costPrice: res.data.costPrice,
            salePrice: res.data.salePrice,
            wholesalePrice: res.data.wholesalePrice,
            stock: res.data.stock,
            minStock: res.data.minStock,
          });
          return;
        }
      });
    }
  }, [barcode]);

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

    if (editingProduct && productToEdit.id !== -1) {
      mutation.mutate({
        id: productToEdit.id,
        ...data,
      });
      return;
    }

    mutation.mutate(data);
  });

  return {
    form,
    isError: mutation.isError,
    isLoading: mutation.isPending,
    response: mutation.data,
    onSubmit,
  };
}

export default useProductForm;

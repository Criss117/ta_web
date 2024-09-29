"use client";

import { useState } from "react";
import useFindProduct from "../../application/hooks/use.find-product";
import BackButton from "@/components/ui/back-button";
import ProductForm from "../components/form/product-form";
import ProductMapper from "../../application/mappers/product.mapper";
import useEditProduct from "../../application/hooks/use.edit-product";

interface Props {
  barcode: string;
}

const EditProductScreen = ({ barcode }: Props) => {
  const [editing, setEditing] = useState(false);
  const { data, error, isFetching, isPending, isError } =
    useFindProduct(barcode);
  const {
    isPending: isEditPending,
    error: editError,
    isError: isEditError,
    editProductMutation,
    mutate,
  } = useEditProduct();

  if (!data) {
    return (
      <div className="mx-2 md:w-2/3 md:mx-auto lg:w-3/5 xl:w-1/3 m-auto mt-10">
        <p>cargando...</p>
      </div>
    );
  }

  return (
    <>
      <BackButton />
      <div className="mx-2 md:w-2/3 md:mx-auto lg:w-3/5 xl:w-1/3 m-auto mt-10">
        <ProductForm
          status={{
            isError: editing ? isEditError : isError,
            isLoading: editing ? isEditPending : isFetching || isPending,
            error: editing ? editError?.message || "" : error?.message || "",
          }}
          data={ProductMapper.toDto(data)}
          mutateFn={(product) => {
            if (!data.id || !product.id) {
              return;
            }
            setEditing(true);
            mutate(product);
          }}
        />
      </div>
    </>
  );
};

export default EditProductScreen;

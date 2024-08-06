"use client";

import ProductForm from "../components/product-form";
import { ProductReceivedAdapter } from "./adapters/product-edit.adapter";
import BackButton from "@/components/ui/back-button";
import useEditProduct from "./hooks/use.edit-product";
import useFindOneProduct from "../../hooks/use.find-one-product";

interface Props {
  barcode: string;
}

const EditProductContainer = ({ barcode }: Props) => {
  const { findOneProductQuery } = useFindOneProduct(barcode);
  const { mutate } = useEditProduct();

  if (!findOneProductQuery.data) {
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
          data={ProductReceivedAdapter.adapt(findOneProductQuery.data?.data)}
          mutateFn={mutate}
          status={{
            isError: findOneProductQuery.isError,
            isLoading: findOneProductQuery.isPending,
            response: findOneProductQuery.data,
          }}
        />
      </div>
    </>
  );
};

export default EditProductContainer;

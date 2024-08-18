"use client";

import BackButton from "@/components/ui/back-button";
import useCreateProduct from "./hooks/use.create-product";
import ProductForm from "../../components/product-form";

const CreateProductContainer = () => {
  const { createProductMutation, mutate } = useCreateProduct();

  return (
    <>
      <BackButton />
      <div className="mx-2 md:w-2/3 md:mx-auto lg:w-3/5 xl:w-1/3 m-auto mt-10">
        <ProductForm
          mutateFn={mutate}
          status={{
            isError: createProductMutation.isError,
            isLoading: createProductMutation.isPending,
            response: createProductMutation.data,
          }}
        />
      </div>
    </>
  );
};

export default CreateProductContainer;

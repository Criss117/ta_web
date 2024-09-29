"use client";

import BackButton from "@/components/ui/back-button";
import useCreateProduct from "../../application/hooks/use.create-product";
import ProductForm from "../components/form/product-form";

const CreateProductScreen = () => {
  const { createProductMutation, mutate } = useCreateProduct();
  return (
    <>
      <BackButton />
      <div className="mx-2 md:w-2/3 md:mx-auto lg:w-3/5 xl:w-1/3 m-auto mt-10">
        <ProductForm
          status={{
            isError: createProductMutation.isError,
            isLoading: createProductMutation.isPending,
            error: createProductMutation.error?.message || "",
          }}
          mutateFn={mutate}
        />
      </div>
    </>
  );
};

export default CreateProductScreen;

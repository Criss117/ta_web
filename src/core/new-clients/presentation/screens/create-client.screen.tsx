"use client";

import BackButton from "@/components/ui/back-button";
import React from "react";
import ClientForm from "../components/create-client/client-form";
import useCreateClient from "@/core/clients/modules/mutate-client/modules/create-client/hooks/use.create-client";

const CreateClientScreen = () => {
  const { mutate, createClientMutation } = useCreateClient();

  return (
    <>
      <BackButton />
      <div className="mx-2 md:w-2/3 md:mx-auto lg:w-3/5 xl:w-1/3 m-auto mt-10">
        <ClientForm
          mutateFn={mutate}
          status={{
            isError: createClientMutation.isError,
            isLoading: createClientMutation.isPending,
            response: createClientMutation.data,
          }}
        />
      </div>
    </>
  );
};

export default CreateClientScreen;

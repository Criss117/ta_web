"use client";

import BackButton from "@/components/ui/back-button";
import useFindOneClient from "@/core/clients/hooks/use.find-one-client";
import ClientForm from "../../components/client-form";
import { ClientReceivedAdapter } from "./adapters/client-edit.adapter";
import useEditClient from "./hooks/use.edit-client";

interface Props {
  ccNumber: string;
}

const EditClientContainer = ({ ccNumber }: Props) => {
  const { findOneClientQuery } = useFindOneClient(ccNumber);
  const { mutate } = useEditClient();

  if (!findOneClientQuery.data) {
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
        <ClientForm
          data={ClientReceivedAdapter.adapt(findOneClientQuery.data?.data)}
          mutateFn={mutate}
          status={{
            isError: findOneClientQuery.isError,
            isLoading: findOneClientQuery.isPending,
            response: findOneClientQuery.data,
          }}
        />
      </div>
    </>
  );
};

export default EditClientContainer;

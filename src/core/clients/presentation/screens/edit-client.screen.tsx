"use client";

import React, { useState } from "react";

import BackButton from "@/components/ui/back-button";
import useFindClient from "../../application/hooks/use.find-client";
import ClientForm from "../components/create-client/client-form";
import ClientDtoMapper from "../../application/mappers/client-dto.mapper";
import useEditClient from "../../application/hooks/use.edit-client";

interface Props {
  ccNumber: string;
}

const EditClientScreen = ({ ccNumber }: Props) => {
  const [editing, setEditing] = useState(false);
  const { data, findOneClientQuery } = useFindClient(ccNumber);
  const { mutate, editClientMutation } = useEditClient();

  if (!data) {
    return (
      <div className="mx-2 md:w-2/3 md:mx-auto lg:w-3/5 xl:w-1/3 m-auto mt-10">
        <p>cargando...</p>
      </div>
    );
  }

  return (
    <div className="mx-2 md:w-2/3 md:mx-auto lg:w-3/5 xl:w-1/3 m-auto mt-10">
      <BackButton />
      <ClientForm
        data={ClientDtoMapper.toDto(data)}
        mutateFn={(client) => {
          if (!data.id) {
            return;
          }
          setEditing(true);
          mutate(client);
        }}
        status={{
          isError: editing
            ? editClientMutation.isError
            : findOneClientQuery.isError,
          isLoading: editing
            ? editClientMutation.isPending
            : findOneClientQuery.isPending,
          error: editing
            ? editClientMutation.error?.message || ""
            : findOneClientQuery.error?.message || "",
        }}
      />
    </div>
  );
};

export default EditClientScreen;

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ClientFormType } from "../../domain/models/type";
import {
  ClientFormSchema,
  EditClientFormSchema,
} from "../../domain/models/schemas";

const useClientForm = (data?: ClientFormType) => {
  const clientForm = useForm<ClientFormType>({
    resolver: zodResolver(data ? EditClientFormSchema : ClientFormSchema),
    defaultValues: data,
  });

  const onSubmit = async (
    values: ClientFormType,
    mutationFn: (client: ClientFormType) => void
  ) => {
    clientForm.clearErrors();

    mutationFn(values);
  };

  return { clientForm, onSubmit };
};

export default useClientForm;

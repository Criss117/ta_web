"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { ClientForm } from "../models/type";
import { ClientFormSchema, EditClientFormSchema } from "../models/schema";

const defaultValues: ClientForm = {
  fullName: "",
  ccNumber: "",
  address: "",
  creditLimit: 0,
  phone: "",
};

const useClientForm = (data?: ClientForm) => {
  const clientForm = useForm<ClientForm>({
    resolver: zodResolver(data ? EditClientFormSchema : ClientFormSchema),
    defaultValues: data ? data : defaultValues,
  });

  const onSubmit = async (
    values: ClientForm,
    mutationFn: (client: ClientForm) => void
  ) => {
    clientForm.clearErrors();

    mutationFn(values);
  };

  return { clientForm, onSubmit };
};

export default useClientForm;

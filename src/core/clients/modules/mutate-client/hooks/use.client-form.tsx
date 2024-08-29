"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { ClientForm } from "../models/type";
import { ClientFormSchema, EditClientFormSchema } from "../models/schema";

const initialData: ClientForm = {
  ccNumber: "1004676135",
  fullName: "Cristian Viveros",
  address: "direcciopjn",
  phone: "3206247918",
  creditLimit: 1000000,
};

const useClientForm = (data?: ClientForm) => {
  const clientForm = useForm<ClientForm>({
    resolver: zodResolver(data ? EditClientFormSchema : ClientFormSchema),
    defaultValues: data || initialData,
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

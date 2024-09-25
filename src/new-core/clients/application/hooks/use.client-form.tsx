"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClientFormSchema, EditClientFormSchema } from "../models/schemas";
import { ClientFormDto } from "../models/type";

const defaultValues: ClientFormDto = {
  fullName: "Juliana Ruiz 2",
  ccNumber: "1004676134",
  address: "cualquiera",
  creditLimit: 10000000,
  phone: "3201231213",
};

const useClientForm = (data?: ClientFormDto) => {
  const clientForm = useForm<ClientFormDto>({
    resolver: zodResolver(data ? EditClientFormSchema : ClientFormSchema),
    defaultValues: data || defaultValues,
  });

  const onSubmit = async (
    values: ClientFormDto,
    mutationFn: (client: ClientFormDto) => void
  ) => {
    clientForm.clearErrors();

    mutationFn(values);
  };

  return { clientForm, onSubmit };
};

export default useClientForm;
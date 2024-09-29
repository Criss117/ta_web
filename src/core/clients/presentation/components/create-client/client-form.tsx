"use client";

import { Loader } from "lucide-react";
import { Form, FormField } from "@/components/ui/form";
import ErrorMessage from "@/components/form/error-message";
import FormItemInput from "@/components/form/form-item-input";
import { Button } from "@/components/ui/button";
import useClientForm from "../../../application/hooks/use.client-form";
import type { ClientFormDto } from "@Core/clients/application/models/type";

const formItemsText = [
  {
    name: "ccNumber",
    label: "Número de cédula",
    placeholder: "Número de cédula",
    type: "text",
  },
  {
    name: "fullName",
    label: "Nombre completo",
    placeholder: "Nombre completo",
    type: "text",
  },
] as const;

const secondFormItemsText = [
  {
    name: "address",
    label: "Dirección",
    placeholder: "Dirección",
    type: "text",
  },
  {
    name: "phone",
    label: "Número de teléfono",
    placeholder: "Número de teléfono",
    type: "text",
  },
] as const;

const formItemsNumber = [
  {
    name: "creditLimit",
    label: "Limite de crédito",
    placeholder: "Limite de crédito",
    type: "number",
    min: 0,
  },
] as const;

interface Props {
  data?: ClientFormDto;
  mutateFn: (client: ClientFormDto) => void;
  status: {
    isLoading: boolean;
    isError: boolean;
    error: string | null;
  };
}

const ClientForm = ({ data, status, mutateFn }: Props) => {
  const { isError, isLoading, error } = status;
  const { clientForm, onSubmit } = useClientForm(data);

  const handleSubmit = (values: ClientFormDto) => {
    onSubmit(values, mutateFn);
  };

  return (
    <Form {...clientForm}>
      <form
        onSubmit={clientForm.handleSubmit(handleSubmit)}
        className="space-y-10"
      >
        <ErrorMessage isError={isError} error={error} />
        <fieldset className="flex justify-between gap-x-2">
          {formItemsText.map((item) => (
            <FormField
              key={item.name}
              control={clientForm.control}
              name={item.name}
              render={({ field }) => (
                <FormItemInput field={field} {...item} className="w-1/2" />
              )}
            />
          ))}
        </fieldset>
        <fieldset className="flex justify-between gap-x-2">
          {secondFormItemsText.map((item) => (
            <FormField
              key={item.name}
              control={clientForm.control}
              name={item.name}
              render={({ field }) => (
                <FormItemInput field={field} {...item} className="w-1/2" />
              )}
            />
          ))}
        </fieldset>
        <fieldset>
          {formItemsNumber.map((item) => (
            <FormField
              key={item.name}
              control={clientForm.control}
              name={item.name}
              render={({ field }) => <FormItemInput field={field} {...item} />}
            />
          ))}
        </fieldset>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : !data ? (
            "Guardar Cliente"
          ) : (
            "Guardar cambios"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ClientForm;

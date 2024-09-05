"use client";
import { useEffect, useState } from "react";
import { CircleDollarSign } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormItemInput from "@/components/form/form-item-input";
import { Separator } from "@/components/ui/separator";
import LoaderComponent from "@/components/ui/loader-component";
import { Form, FormField } from "@/components/ui/form";

import useManageClientForm from "../hooks/use.manage-client-form";

interface Props {
  clientId: number;
  disabled?: boolean;
}

const formItemsNumber = [
  {
    name: "amount",
    label: "Cantidad",
    placeholder: "Abono",
    type: "number",
    min: 0,
  },
  {
    name: "clientId",
    label: "Id del cliente",
    placeholder: "Id del cliente",
    type: "hidden",
    min: 0,
    hidden: true,
  },
] as const;

const DebtPaymentModal = ({ clientId, disabled }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    debtPaymentForm,
    isPending,
    isSuccess,
    onCreateDebtPayment,
    clearForm,
  } = useManageClientForm({
    clientId,
  });

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    !isOpen && clearForm();
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        if (isPending) return;
        setIsOpen(!isOpen);
      }}
    >
      <DialogTrigger>
        <Button variant="outline" asChild className="space-x-2 ">
          <p>
            <CircleDollarSign />
            <span>Abonar</span>
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Abonar</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...debtPaymentForm}>
          <form className="flex" onSubmit={onCreateDebtPayment}>
            <fieldset className="w-2/3 mx-5">
              {formItemsNumber.map((item) => (
                <FormField
                  key={item.name}
                  control={debtPaymentForm.control}
                  name={item.name}
                  render={({ field }) => (
                    <FormItemInput
                      field={field}
                      {...item}
                      className="w-[80%]"
                    />
                  )}
                />
              ))}
            </fieldset>
            <Separator orientation="vertical" />
            <fieldset className="w-1/3 mx-5 space-y-2">
              <Button type="submit" className="w-full" disabled={isPending}>
                <LoaderComponent title="Abonar" isLoading={isPending} />
              </Button>
              <Button
                type="button"
                variant="destructive"
                className="w-full"
                onClick={() => setIsOpen(false)}
                disabled={isPending}
              >
                Cancelar
              </Button>
            </fieldset>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DebtPaymentModal;

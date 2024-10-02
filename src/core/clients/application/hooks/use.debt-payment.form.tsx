"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { DebtPaymentForm } from "../models/type";
import { CreateDebtPaymentSchema } from "../models/schemas";
import useCreateDebtPayment from "./use.create-debt-payment";
import ClientEntity from "../../domain/entitites/client.entity";

const useDebtPaymentForm = ({ client }: { client: ClientEntity }) => {
  const {
    isPending,
    isSuccess,
    onCreateDebtPay: onMutate,
  } = useCreateDebtPayment();

  const debtPaymentForm = useForm<DebtPaymentForm>({
    resolver: zodResolver(CreateDebtPaymentSchema),
    defaultValues: {
      amount: 0,
      clientId: client.id,
    },
  });

  const onCreateDebtPayment = debtPaymentForm.handleSubmit(
    (data: DebtPaymentForm) => {
      if (data.amount <= 0 || data.amount > client.balance) {
        debtPaymentForm.setError("amount", {
          type: "custom",
          message: "El monto no puede ser negativo o mayor al saldo disponible",
        });

        return;
      }

      onMutate(data.amount, client.id);
    }
  );

  const clearForm = () => {
    debtPaymentForm.reset();
  };

  return {
    isPending,
    isSuccess,
    debtPaymentForm,
    onCreateDebtPayment,
    clearForm,
  };
};

export default useDebtPaymentForm;

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { DebtPaymentForm } from "../models/type";
import { CreateDebtPaymentSchema } from "../models/schemas";
import useCreateDebtPayment from "./use.create-debt-payment";

const useDebtPaymentForm = ({ clientId }: { clientId: number }) => {
  const {
    isPending,
    isSuccess,
    onCreateDebtPay: onMutate,
  } = useCreateDebtPayment();

  const debtPaymentForm = useForm<DebtPaymentForm>({
    resolver: zodResolver(CreateDebtPaymentSchema),
    defaultValues: {
      amount: 0,
      clientId,
    },
  });

  const onCreateDebtPayment = debtPaymentForm.handleSubmit(
    (data: DebtPaymentForm) => {
      onMutate(data.amount, clientId);
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

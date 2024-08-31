"use client";
import { useMutation } from "@tanstack/react-query";
import type { ProductSale, Ticket } from "../models/types";
import { payAction } from "../actions/pay.action";

interface Props {
  ticket: Ticket;
  products: ProductSale[];
}

async function pay({ ticket, products }: Props) {
  const res = await payAction({ ...ticket, products });

  return res;
}

const usePay = ({ products, ticket }: Props) => {
  const payMutation = useMutation({
    mutationFn: pay,
  });

  const onMutate = async () => {
    await payMutation.mutateAsync({ ticket, products });
  };

  return { payMutation, onMutate };
};

export default usePay;

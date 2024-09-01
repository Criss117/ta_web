"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

import { paymentAction } from "../actions/payment.action";
import type { ProductSale, Ticket } from "../models/types";
import { PAY_MESSAGES } from "@/lib/messages/product.messages";
import { useState } from "react";
import { useTicketsState } from "@/core/tickets/state/tickets.state";
import { ClientPay } from "@/core/clients/modules/client-list/models/types";

interface Props {
  ticket: Ticket;
  products: ProductSale[];
  client?: ClientPay;
}

async function pay({ ticket, products, client }: Props) {
  const res = await paymentAction({ ...ticket, products, client });

  return res;
}

const usePay = ({ products, ticket, client }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { clearTicket } = useTicketsState();
  const payMutation = useMutation({
    mutationFn: pay,
    onSuccess: async (res) => {
      if (res.error || !res.success) {
        toast({
          variant: "destructive",
          title: PAY_MESSAGES.ERROR_TITLE,
          description: res.error,
        });
        return;
      }

      clearTicket();
      toast({
        title: PAY_MESSAGES.SUCCESS,
      });
      setIsOpen(false);
    },
  });

  const onMutate = () => {
    payMutation.mutate({ ticket, products, client });
  };

  return { payMutation, isOpen, setIsOpen, onMutate };
};

export default usePay;

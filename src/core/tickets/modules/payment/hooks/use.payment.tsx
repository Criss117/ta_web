"use client";
import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

import { paymentAction } from "../actions/payment.action";
import { useTicketsState } from "@/core/tickets/state/tickets.state";
import { ClientPay } from "@/core/clients/modules/client-list/models/types";
import { PAY_MESSAGES } from "@/lib/messages/pay.message";
import type { ProductSale, Ticket } from "../models/types";

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
  const queryClient = useQueryClient();
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

      await queryClient.invalidateQueries({
        queryKey: ["client", client?.ccNumber],
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

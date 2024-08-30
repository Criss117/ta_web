"use client";

import { useMutation } from "@tanstack/react-query";
import { deleteClientAction } from "../actions/delete-client.action";
import { toast } from "@/components/ui/use-toast";
import { ClIENT_FORM_MESSAGES } from "@/lib/messages/product.messages";

async function deleteClient({
  ccNumber,
  id,
}: {
  ccNumber: string;
  id: number;
}) {
  const res = await deleteClientAction(ccNumber, id);

  return res;
}

const useDeleteClient = () => {
  const deleteClientMutation = useMutation({
    mutationFn: deleteClient,
    onSuccess: (res) => {
      if (res.error) {
        toast({
          variant: "destructive",
          title: ClIENT_FORM_MESSAGES.ERROR_TITLE,
          description: res.error,
        });
        return;
      }

      toast({
        title: ClIENT_FORM_MESSAGES.DELETE_SUCCESS,
      });
    },
  });

  const mutate = ({ ccNumber, id }: { ccNumber: string; id: number }) => {
    deleteClientMutation.mutate({ ccNumber, id });
  };

  return { deleteClientMutation, mutate };
};

export default useDeleteClient;

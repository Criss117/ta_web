"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ClientForm } from "../../../models/type";
import { editClientAction } from "../actions/edit-client.action";
import { ClientToEditAdapter } from "../adapters/client-edit.adapter";
import { toast } from "@/components/ui/use-toast";
import { ClIENT_FORM_MESSAGES } from "@/lib/messages/product.messages";
import { ROUTES } from "@/lib/constants/nav";

async function editClient(client: ClientForm) {
  const adaptedClient = ClientToEditAdapter.adapt(client);
  const res = await editClientAction(adaptedClient);
  return res;
}

const useEditClient = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const editClientMutation = useMutation({
    mutationFn: editClient,
    onSuccess: async (res) => {
      if (res.error) {
        toast({
          variant: "destructive",
          title: ClIENT_FORM_MESSAGES.ERROR_TITLE,
          description: res.error,
        });
        return;
      }

      toast({
        title: ClIENT_FORM_MESSAGES.SUCCESS,
      });

      await queryClient.invalidateQueries({
        queryKey: ["client", res?.data?.ccNumber],
      });

      router.push(ROUTES.CLIENTS);
    },
  });

  const mutate = (client: ClientForm) => {
    editClientMutation.mutate(client);
  };

  return { editClientMutation, mutate };
};

export default useEditClient;

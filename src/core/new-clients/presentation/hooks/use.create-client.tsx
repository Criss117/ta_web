"use client";

import { useMutation } from "@tanstack/react-query";

import { toast } from "@/components/ui/use-toast";
import { CLIENT_FORM_MESSAGES } from "@/lib/messages/product.messages";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/nav";
import { ClientFormType } from "../../domain/models/type";
import { CreateClientService } from "@/core/clients/modules/mutate-client/modules/create-client/services/create-client.service";

async function createClient(client: ClientFormType) {
  const createClient = new CreateClientService(client);
  const res = await createClient.execute();
  return res;
}

const useCreateClient = () => {
  const router = useRouter();

  const createClientMutation = useMutation({
    mutationFn: createClient,
    onSuccess: (res) => {
      if (res.error) {
        toast({
          variant: "destructive",
          title: CLIENT_FORM_MESSAGES.ERROR_TITLE,
          description: res.error,
        });
        return;
      }

      toast({
        title: CLIENT_FORM_MESSAGES.SUCCESS,
      });

      router.push(ROUTES.CLIENTS);
    },
  });

  const mutate = (client: ClientFormType) => {
    createClientMutation.mutate(client);
  };
  return { createClientMutation, mutate };
};

export default useCreateClient;

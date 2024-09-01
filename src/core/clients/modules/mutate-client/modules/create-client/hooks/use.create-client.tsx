"use client";

import { useMutation } from "@tanstack/react-query";

import { toast } from "@/components/ui/use-toast";
import { CLIENT_FORM_MESSAGES } from "@/lib/messages/product.messages";

import { ClientForm } from "../../../models/type";
import { CreateClientService } from "../services/create-client.service";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/nav";

async function createClient(client: ClientForm) {
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

  const mutate = (client: ClientForm) => {
    createClientMutation.mutate(client);
  };
  return { createClientMutation, mutate };
};

export default useCreateClient;

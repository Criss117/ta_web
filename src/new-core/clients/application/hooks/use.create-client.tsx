"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { toast } from "@/components/ui/use-toast";
import { CLIENT_FORM_MESSAGES } from "@/lib/messages/product.messages";
import { ROUTES } from "@/lib/constants/nav";

import ClientDtoMapper from "../mappers/client-dto.mapper";
import ClientUseCasesFactory from "../../composition-root/client-usecases.factory";

import type { ClientFormDto } from "../models/type";

async function createClient(client: ClientFormDto) {
  const createClientUseCase = ClientUseCasesFactory.createCreateClient();

  const clientEntity = ClientDtoMapper.toDomain(client);

  return await createClientUseCase.execute(clientEntity);
}

const useCreateClient = () => {
  const router = useRouter();

  const createClientMutation = useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      toast({
        title: CLIENT_FORM_MESSAGES.SUCCESS,
      });

      router.push(ROUTES.CLIENTS);
    },
    onError: (error) => {
      console.log(error.message);
      toast({
        variant: "destructive",
        title: CLIENT_FORM_MESSAGES.ERROR_TITLE,
        description: "Error al crear el cliente",
      });
    },
  });

  const mutate = (client: ClientFormDto) => {
    createClientMutation.mutate(client);
  };
  return { createClientMutation, mutate };
};

export default useCreateClient;

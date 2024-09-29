"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ROUTES } from "@/lib/constants/nav";
import { toast } from "@/components/ui/use-toast";
import { errorMessage } from "@Core/common/lib/error-message";
import { CLIENT_FORM_MESSAGES } from "@/lib/messages/product.messages";

import { ClientFormDto } from "../models/type";
import ClientDtoMapper from "../mappers/client-dto.mapper";
import ClientUseCasesFactory from "../../composition-root/client-usecases.factory";

async function editClient(editClientDto: ClientFormDto) {
  const editClientUseCase = ClientUseCasesFactory.createEditClient();

  return editClientUseCase.execute(ClientDtoMapper.toDomain(editClientDto));
}

const useEditClient = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const editClientMutation = useMutation({
    mutationFn: editClient,
    onSuccess: async (res) => {
      toast({
        title: CLIENT_FORM_MESSAGES.SUCCESS,
      });

      await queryClient.invalidateQueries({
        queryKey: ["client", res?.ccNumber],
      });

      router.push(ROUTES.CLIENTS);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: CLIENT_FORM_MESSAGES.ERROR_TITLE,
        description: errorMessage(error.message),
      });
    },
  });

  const mutate = (editClientDto: ClientFormDto) => {
    editClientMutation.mutate(editClientDto);
  };

  return { editClientMutation, mutate };
};

export default useEditClient;

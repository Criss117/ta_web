"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { CLIENT_FORM_MESSAGES } from "@/lib/messages/product.messages";
import { DeleteClientDto } from "../dto/delete-client.dto";
import ClientUseCasesFactory from "../../composition-root/client-usecases.factory";
import { errorMessage } from "@Core/common/lib/error-message";

async function deleteClient({
  ccNumber,
  id,
}: {
  ccNumber: string;
  id: number;
}) {
  const DeleteClientUseCase = ClientUseCasesFactory.createDeleteClient();

  return await DeleteClientUseCase.execute(id, ccNumber);
}

const useDeleteClient = () => {
  const deleteClientMutation = useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      toast({
        title: CLIENT_FORM_MESSAGES.DELETE_SUCCESS,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: CLIENT_FORM_MESSAGES.ERROR_TITLE,
        description: errorMessage(error.message),
      });
    },
  });

  const mutate = (deleteClientDto: DeleteClientDto) => {
    deleteClientMutation.mutate(deleteClientDto);
  };

  return { deleteClientMutation, mutate };
};

export default useDeleteClient;

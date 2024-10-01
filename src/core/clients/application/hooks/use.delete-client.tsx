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
  id: string;
}) {
  const DeleteClientUseCase = ClientUseCasesFactory.createDeleteClient();

  return await DeleteClientUseCase.execute(id, ccNumber);
}

const useDeleteClient = () => {
  const deleteClientMutation = useMutation({
    mutationFn: deleteClient,
    onSuccess: (response) => {
      if (!response || response.error) {
        toast({
          variant: "destructive",
          title: CLIENT_FORM_MESSAGES.DELETE_ERROR,
          description: response.error,
        });

        return;
      }

      toast({
        title: CLIENT_FORM_MESSAGES.DELETE_SUCCESS,
      });
    },
  });

  const mutate = (deleteClientDto: DeleteClientDto) => {
    deleteClientMutation.mutate(deleteClientDto);
  };

  return { deleteClientMutation, mutate };
};

export default useDeleteClient;

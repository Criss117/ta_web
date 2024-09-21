import { Client } from "@prisma/client";
import { ClientFormSchema, EditClientFormSchema } from "./schemas";
import { z } from "zod";
import { ActionState } from "@/lib/create-safe-action";

export type CreateClientInputType = z.infer<typeof ClientFormSchema>;
export type EditClientInputType = z.infer<typeof EditClientFormSchema>;

export type ClientFormType = z.infer<typeof ClientFormSchema> & {
  id?: number;
};

export type MutateClientReturnType = ActionState<ClientForm, Client>;

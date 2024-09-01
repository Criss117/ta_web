import { z } from "zod";
import { ClientFormSchema, EditClientFormSchema } from "./schema";
import type { ActionState } from "@/lib/create-safe-action";
import { Client } from "@prisma/client";

export type CreateClientInputType = z.infer<typeof ClientFormSchema>;
export type EditClientInputType = z.infer<typeof EditClientFormSchema>;

export type ClientForm = z.infer<typeof ClientFormSchema> & {
  id?: number;
};

export type MutateClientReturnType = ActionState<ClientForm, Client>;

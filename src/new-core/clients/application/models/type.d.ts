import { Client } from "@prisma/client";
import {
  ClientFormSchema,
  CreateDebtPaymentSchema,
  EditClientFormSchema,
} from "./schemas";
import { z } from "zod";
import { ActionState } from "@/lib/create-safe-action";

export type CreateClientInputType = z.infer<typeof ClientFormSchema>;
export type EditClientDto = z.infer<typeof EditClientFormSchema>;

export type ClientFormDto = z.infer<typeof ClientFormSchema> & {
  id?: number;
};

export type MutateClientReturnType = ActionState<ClientForm, Client>;
export type DebtPaymentForm = z.infer<typeof CreateDebtPaymentSchema>;

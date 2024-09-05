import { z } from "zod";
import { CreateDebtPaymentSchema } from "./schemas";
import { ActionState } from "@/lib/create-safe-action";
import { Client } from "@prisma/client";
import { ClientAndTickets } from "@/core/clients/models/types";

export type DebtPaymentForm = z.infer<typeof CreateDebtPaymentSchema>;

export type CreateDebtPaymentInputType = z.infer<
  typeof CreateDebtPaymentSchema
>;

export type CreateDebtPaymentReturnType = ActionState<
  CreateDebtPaymentInputType,
  ClientAndTickets
>;

import { z } from "zod";
import {
  CreateDebtPaymentSchema,
  DeleteDebtPaymentSchema,
  FindDPByClientIdSchema,
} from "./schemas";
import type { ActionState } from "@/lib/create-safe-action";
import { Client, DebtPayment } from "@prisma/client";
import { ClientAndTickets } from "@/core/clients/models/types";

export type DebtPaymentForm = z.infer<typeof CreateDebtPaymentSchema>;

export type CreateDebtPaymentInputType = z.infer<
  typeof CreateDebtPaymentSchema
>;
export type FindDPByClientIdInputType = z.infer<typeof FindDPByClientIdSchema>;
export type DeleteDebtPaymentInputType = z.infer<
  typeof DeleteDebtPaymentSchema
>;

export type CreateDebtPaymentReturnType = ActionState<
  CreateDebtPaymentInputType,
  ClientAndTickets
>;

export type FindDPByClientIdReturnType = ActionState<
  FindDPByClientIdInputType,
  DebtPayment[]
>;

export type DeleteDebtPaymentReturnType = ActionState<
  DeleteDebtPaymentInputType,
  {
    ccNumber: string;
  }
>;

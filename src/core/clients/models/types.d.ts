import { z } from "zod";
import { FindOneClientSchema, SettleDebtSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Client, Ticket } from "@prisma/client";

export type FindOneClientInputType = z.infer<typeof FindOneClientSchema>;

export type ClientAndTickets = Client & {
  tickets?: Ticket[];
};

export type FindOneClientReturnType = ActionState<
  FindOneClientInputType,
  ClientAndTickets
>;

export type SettleDebtInputType = z.infer<typeof SettleDebtSchema>;
export type SettleDebtReturnType = ActionState<
  SettleDebtInputType,
  {
    ccNumber: string;
  }
>;

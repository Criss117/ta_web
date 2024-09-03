import { z } from "zod";
import { FindOneClientSchema } from "./schema";
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

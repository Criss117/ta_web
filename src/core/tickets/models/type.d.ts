import { Product } from "@prisma/client";
import { z } from "zod";
import {
  DeleteTicketSchema,
  ProductTicketSchema,
  TicketSchema,
} from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type ProductTicket = z.infer<typeof ProductTicketSchema>;

export type Ticket = z.infer<typeof TicketSchema>;

export type TicketLS = {
  tickets: Ticket[];
  currentTicketId: number;
};
export type DeleteTicketinputType = z.infer<typeof DeleteTicketSchema>;
export type DeleteTicketReturnType = ActionState<DeleteTicketinputType, null>;

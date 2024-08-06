import { Product } from "@prisma/client";
import { z } from "zod";
import { ProductTicketSchema, TicketSchema } from "./schema";

export type ProductTicket = z.infer<typeof ProductTicketSchema>;

export type Ticket = z.infer<typeof TicketSchema>;

export type TicketLS = {
  tickets: Ticket[];
  currentTicketId: number;
};

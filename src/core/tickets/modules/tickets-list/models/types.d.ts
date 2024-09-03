import { z } from "zod";
import {
  TicketListSchema,
  TicketsMonthSchema,
  TicketsYearSchema,
} from "./schema";

export type TicketList = z.infer<typeof TicketListSchema>;
export type TicketMonth = z.infer<typeof TicketsMonthSchema>;
export type TicketYear = z.infer<typeof TicketsYearSchema>;

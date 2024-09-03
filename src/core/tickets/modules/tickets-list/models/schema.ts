import { z } from "zod";

export const TicketListSchema = z.object({
  id: z.number(),
  day: z.number(),
  dayId: z.number(),
  total: z.number(),
});

export const TicketsMonthSchema = z.record(
  z.number(),
  z.array(TicketListSchema)
);

export const TicketsYearSchema = z.record(z.number(), TicketsMonthSchema);

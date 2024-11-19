import { z } from "zod";
import { CommonArtSchema } from "./schemas";

export type TicketYear = {
  [x: number]: Record<number, TicketList[]>;
};

export type TicketMonth = {
  [x: number]: TicketList[];
};

export type TicketList = {
  id: string;
  total: number;
  day: number;
  dayId: number;
};

export type CommonArtDto = z.infer<typeof CommonArtSchema>;

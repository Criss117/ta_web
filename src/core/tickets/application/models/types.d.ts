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

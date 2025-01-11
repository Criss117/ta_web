import { DebtPayStateEnum } from "@/core/reports/client/domain/entities/client-report.entity";
import { TicketStateEnum } from "@/core/tickets/domain/enums/ticket-state.enum";

export const TICKET_TRANSLATES = {
  [TicketStateEnum.PENDING]: "Pendiente",
  [TicketStateEnum.PAID]: "Pagado",
  [TicketStateEnum.DELETED]: "Eliminado",
};

export const DEBT_TRANSLATES = {
  [DebtPayStateEnum.ACTIVE]: "Activo",
  [DebtPayStateEnum.DELETED]: "Eliminado",
};

import { ColumnDef } from "@tanstack/react-table";
import {
  DebtPayStateEnum,
  DebtReport,
  Report,
  TicketReport,
} from "@/core/reports/client/domain/entities/client-report.entity";
import {
  DEBT_TRANSLATES,
  TICKET_TRANSLATES,
} from "@/core/common/lib/constants/translates";
import { TicketStateEnum } from "@/core/tickets/domain/enums/ticket-state.enum";

export const clientTicketReportTableColumns: ColumnDef<TicketReport>[] = [
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "state",
    header: "Estado",
    cell: ({ getValue }) => {
      return TICKET_TRANSLATES[getValue() as TicketStateEnum];
    },
  },
  {
    accessorKey: "createdAt",
    header: "Creado el",
    cell: ({ getValue }) => {
      return new Date(getValue() as Date).toLocaleDateString();
    },
  },
];

export const clientDebtReportTableColumns: ColumnDef<DebtReport>[] = [
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "state",
    header: "Estado",
    cell: ({ getValue }) => {
      return DEBT_TRANSLATES[getValue() as DebtPayStateEnum];
    },
  },
  {
    accessorKey: "lastBalance",
    header: "Balance",
  },
  {
    accessorKey: "createdAt",
    header: "Último pago",
    cell: ({ getValue }) => {
      return new Date(getValue() as Date).toLocaleDateString();
    },
  },
];

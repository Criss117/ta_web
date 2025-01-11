import { ColumnDef } from "@tanstack/react-table";
import {
  DebtReport,
  Report,
  TicketReport,
} from "@/core/reports/client/domain/entities/client-report.entity";

export const clientTicketReportTableColumns: ColumnDef<TicketReport>[] = [
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "state",
    header: "Estado",
  },
  {
    accessorKey: "createdAt",
    header: "Createdo el",
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
  },
  {
    accessorKey: "lastBalance",
    header: "Balance",
  },
  {
    accessorKey: "createdAt",
    header: "Createdo el",
  },
];

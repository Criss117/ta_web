import { Client, DebtPayment, Ticket } from "@prisma/client";
import {
  ClientReportEntity,
  DebtPayStateEnum,
} from "../../domain/entities/client-report.entity";
import { TicketStateEnum } from "@/core/tickets/domain/enums/ticket-state.enum";

export class ClientReportMapper {
  static consultToDomain(
    client: Client,
    tickets: Array<Ticket>,
    debts: Array<DebtPayment>
  ): ClientReportEntity {
    const allTickets: ClientReportEntity["allTickets"] = tickets.map((t) => ({
      id: t.id,
      total: t.total,
      state: t.state as TicketStateEnum,
      createdAt: t.createdAt,
    }));

    const allDebts: ClientReportEntity["allDebts"] = debts.map((d) => ({
      id: d.id,
      total: d.amount,
      createdAt: d.createdAt,
      state: d.deletedAt ? DebtPayStateEnum.DELETED : DebtPayStateEnum.ACTIVE,
      lastBalance: d.lastBalance,
    }));

    return ClientReportEntity.builder()
      .ccNumber(client.ccNumber)
      .fullName(client.fullName)
      .creditLimit(client.creditLimit)
      .createdAt(client.createdAt)
      .currentDebt(client.balance)
      .totalDebt(
        debts.reduce((acc, debt) => acc + debt.amount, 0) + client.balance
      )
      .phone(client.phone)
      .allTickets(allTickets)
      .allDebts(allDebts)
      .build();
  }
}

import { TicketStateEnum } from "@/core/tickets/domain/enums/ticket-state.enum";

export type Report = {
  id: string;
  total: number;
  createdAt: Date;
};

export enum DebtPayStateEnum {
  ACTIVE = "active",
  DELETED = "deleted",
}

export type TicketReport = Report & {
  state: TicketStateEnum;
};

export type DebtReport = Report & {
  state: DebtPayStateEnum;
  lastBalance: number;
};

export interface ClientReportPrimitive {
  fullName: string;
  ccNumber: string;
  creditLimit: number;
  createdAt: Date | null;
  phone: string | null;
  currentDebt: number;
  totalDebt: number;
  allTickets: Array<TicketReport>;
  allDebts: Array<DebtReport>;
}

export class ClientReportEntity {
  name: string = "";
  ccNumber: string = "";
  creditLimit: number = -1;
  createdAt: Date | null = null;
  phone: string | null = null;
  currentDebt: number = -1;
  totalDebt: number = -1;
  allTickets: Array<TicketReport> = [];
  allDebts: Array<DebtReport> = [];

  public static builder() {
    return new ClientReportEntityBuilder();
  }

  public toValue(): ClientReportPrimitive {
    return {
      fullName: this.name,
      ccNumber: this.ccNumber,
      creditLimit: this.creditLimit,
      createdAt: this.createdAt,
      phone: this.phone,
      currentDebt: this.currentDebt,
      totalDebt: this.totalDebt,
      allTickets: this.allTickets,
      allDebts: this.allDebts,
    };
  }
}

class ClientReportEntityBuilder {
  private clientReportEntity = new ClientReportEntity();

  fullName(fullName: string) {
    this.clientReportEntity.name = fullName;
    return this;
  }

  ccNumber(ccNumber: string) {
    this.clientReportEntity.ccNumber = ccNumber;
    return this;
  }

  creditLimit(creditLimit: number) {
    this.clientReportEntity.creditLimit = creditLimit;
    return this;
  }

  createdAt(createdAt: Date | null) {
    this.clientReportEntity.createdAt = createdAt;
    return this;
  }

  phone(phone: string | null) {
    this.clientReportEntity.phone = phone;
    return this;
  }

  currentDebt(currentDebt: number) {
    this.clientReportEntity.currentDebt = currentDebt;
    return this;
  }

  totalDebt(totalDebt: number) {
    this.clientReportEntity.totalDebt = totalDebt;
    return this;
  }

  allTickets(allTickets: Array<TicketReport>) {
    this.clientReportEntity.allTickets = allTickets;
    return this;
  }

  allDebts(allDebts: Array<DebtReport>) {
    this.clientReportEntity.allDebts = allDebts;
    return this;
  }

  build() {
    return this.clientReportEntity;
  }
}

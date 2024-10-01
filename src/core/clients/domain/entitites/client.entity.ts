import TicketEntity from "@Core/tickets/domain/entities/ticket.entity";

class ClientEntity {
  public id: string = "";
  public ccNumber: string = "";
  public fullName: string = "";
  public address: string | null = null;
  public phone: string | null = null;
  public creditLimit: number = -1;
  public balance: number = -1;
  public tickets: Array<TicketEntity> | null = null;
  public createdAt: Date | null = null;
  public updatedAt: Date | null = null;
  public deletedAt: Date | null = null;
  public isActive: boolean = false;

  public static builder() {
    return new ClientEntityBuilder();
  }
}

class ClientEntityBuilder {
  private clientEntity = new ClientEntity();

  id(id: string) {
    this.clientEntity.id = id;
    return this;
  }

  ccNumber(ccNumber: string) {
    this.clientEntity.ccNumber = ccNumber;
    return this;
  }

  fullName(fullName: string) {
    this.clientEntity.fullName = fullName;
    return this;
  }

  address(address: string | null) {
    this.clientEntity.address = address;
    return this;
  }

  phone(phone: string | null) {
    this.clientEntity.phone = phone;
    return this;
  }

  creditLimit(creditLimit: number) {
    this.clientEntity.creditLimit = creditLimit;
    return this;
  }

  balance(balance: number) {
    this.clientEntity.balance = balance;
    return this;
  }

  tickets(tickets: Array<TicketEntity> | null) {
    this.clientEntity.tickets = tickets;
    return this;
  }

  createdAt(createdAt: Date | null) {
    this.clientEntity.createdAt = createdAt;
    return this;
  }

  updatedAt(updatedAt: Date | null) {
    this.clientEntity.updatedAt = updatedAt;
    return this;
  }

  deletedAt(deletedAt: Date | null) {
    this.clientEntity.deletedAt = deletedAt;
    return this;
  }

  isActive(isActive: boolean) {
    this.clientEntity.isActive = isActive;
    return this;
  }

  build() {
    return this.clientEntity;
  }
}

export default ClientEntity;

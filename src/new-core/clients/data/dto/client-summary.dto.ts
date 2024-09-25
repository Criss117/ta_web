class ClientSummaryDto {
  public id: number = -1;
  public ccNumber: string = "";
  public fullName: string = "";
  public address: string | null = null;
  public phone: string | null = null;
  public creditLimit: number = -1;
  public balance: number = -1;

  public static builder() {
    return new ClientSummaryDtoBuilder();
  }
}

class ClientSummaryDtoBuilder {
  private clientSummary = new ClientSummaryDto();
  constructor() {}

  id(id: number) {
    this.clientSummary.id = id;
    return this;
  }

  ccNumber(ccNumber: string) {
    this.clientSummary.ccNumber = ccNumber;
    return this;
  }

  fullName(fullName: string) {
    this.clientSummary.fullName = fullName;
    return this;
  }

  address(address: string | null) {
    this.clientSummary.address = address;
    return this;
  }

  phone(phone: string | null) {
    this.clientSummary.phone = phone;
    return this;
  }

  balance(balance: number) {
    this.clientSummary.balance = balance;
    return this;
  }

  creditLimit(creditLimit: number) {
    this.clientSummary.creditLimit = creditLimit;
    return this;
  }

  build() {
    return this.clientSummary;
  }
}

export default ClientSummaryDto;

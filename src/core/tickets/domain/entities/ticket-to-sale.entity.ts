import ProductTicketEntity from "@Core/products/domain/entities/product-ticket.entity";

class TicketToSaleEntity {
  public id: number = -1;
  public label: string = "";
  public total: number = -1;
  public clientId?: number;
  public ccNumber?: string;
  public clientName?: string;
  public productsTickets: Array<ProductTicketEntity> = [];

  public static builder() {
    return new TicketToSaleEntityBuilder();
  }
}

class TicketToSaleEntityBuilder {
  private ticketToSaleEntity = new TicketToSaleEntity();

  public id(id: number) {
    this.ticketToSaleEntity.id = id;
    return this;
  }

  public label(label: string) {
    this.ticketToSaleEntity.label = label;
    return this;
  }

  public total(total: number) {
    this.ticketToSaleEntity.total = total;
    return this;
  }

  public productsTickets(productsTickets: Array<ProductTicketEntity>) {
    this.ticketToSaleEntity.productsTickets = productsTickets;
    return this;
  }

  public clientId(clientId: number) {
    this.ticketToSaleEntity.clientId = clientId;
    return this;
  }

  public ccNumber(ccNumber: string) {
    this.ticketToSaleEntity.ccNumber = ccNumber;
    return this;
  }

  public build() {
    return this.ticketToSaleEntity;
  }
}

export default TicketToSaleEntity;

import ClientEntity from "@Core/clients/domain/entitites/client.entity";
import { TicketStateEnum } from "../enums/ticket-state.enum";
import ProductSaleEntity from "@Core/products-sale/domain/entities/product-sale.entity";

class TicketEntity {
  public id: number = -1;
  public total: number = -1;
  public state: TicketStateEnum = TicketStateEnum.PENDING;
  public createdAt: Date | null = null;
  public updatedAt: Date | null = null;
  public deletedAt: Date | null = null;
  public isActive: boolean = false;
  public clientId: number = -1;
  public client: ClientEntity | null = null;
  public productSales: Array<ProductSaleEntity> | null = null;

  public static builder() {
    return new TicketEntityBuilder();
  }
}

class TicketEntityBuilder {
  private ticketEntity = new TicketEntity();

  id(id: number) {
    this.ticketEntity.id = id;
    return this;
  }

  total(total: number) {
    this.ticketEntity.total = total;
    return this;
  }

  state(state: TicketStateEnum) {
    this.ticketEntity.state = state;
    return this;
  }

  createdAt(createdAt: Date | null) {
    this.ticketEntity.createdAt = createdAt;
    return this;
  }

  updatedAt(updatedAt: Date | null) {
    this.ticketEntity.updatedAt = updatedAt;
    return this;
  }

  deletedAt(deletedAt: Date | null) {
    this.ticketEntity.deletedAt = deletedAt;
    return this;
  }

  isActive(isActive: boolean) {
    this.ticketEntity.isActive = isActive;
    return this;
  }

  clientId(clientId: number) {
    this.ticketEntity.clientId = clientId;
    return this;
  }

  client(client: ClientEntity | null) {
    this.ticketEntity.client = client;
    return this;
  }

  productSales(productSales: Array<ProductSaleEntity> | null) {
    this.ticketEntity.productSales = productSales;
    return this;
  }

  build() {
    return this.ticketEntity;
  }
}

export default TicketEntity;

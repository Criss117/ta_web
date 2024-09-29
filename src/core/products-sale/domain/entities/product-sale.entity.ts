import ProductEntity from "@Core/products/domain/entities/product.entity";
import TicketEntity from "@Core/tickets/domain/entities/ticket.entity";

class ProductSaleEntity {
  public id: number = -1;
  public salePrice: number = -1;
  public quantity: number = -1;
  public subTotal: number = -1;
  public ticketId: number = -1;
  public ticket: TicketEntity | null = null;
  public productId: number = -1;
  public product: ProductEntity | null = null;
  public createdAt: Date | null = null;
  public updatedAt: Date | null = null;
  public deletedAt: Date | null = null;
  public isActive: boolean = false;

  public static builder() {
    return new ProductSaleEntityBuilder();
  }
}

class ProductSaleEntityBuilder {
  private productSaleEntity = new ProductSaleEntity();

  public id(id: number) {
    this.productSaleEntity.id = id;
    return this;
  }

  public salePrice(salePrice: number) {
    this.productSaleEntity.salePrice = salePrice;
    return this;
  }

  public quantity(quantity: number) {
    this.productSaleEntity.quantity = quantity;
    return this;
  }

  public subTotal(subTotal: number) {
    this.productSaleEntity.subTotal = subTotal;
    return this;
  }

  public ticketId(ticketId: number) {
    this.productSaleEntity.ticketId = ticketId;
    return this;
  }

  public ticket(ticket: TicketEntity | null) {
    this.productSaleEntity.ticket = ticket;
    return this;
  }

  public productId(productId: number) {
    this.productSaleEntity.productId = productId;
    return this;
  }

  public product(product: ProductEntity | null) {
    this.productSaleEntity.product = product;
    return this;
  }

  public createdAt(createdAt: Date | null) {
    this.productSaleEntity.createdAt = createdAt;
    return this;
  }

  public updatedAt(updatedAt: Date | null) {
    this.productSaleEntity.updatedAt = updatedAt;
    return this;
  }

  public deletedAt(deletedAt: Date | null) {
    this.productSaleEntity.deletedAt = deletedAt;
    return this;
  }

  public isActive(isActive: boolean) {
    this.productSaleEntity.isActive = isActive;
    return this;
  }

  public build() {
    return this.productSaleEntity;
  }
}

export default ProductSaleEntity;

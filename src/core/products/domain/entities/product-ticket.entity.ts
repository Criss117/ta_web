class ProductTicketEntity {
  public id: number = -1;
  public barcode: string = "";
  public productId: number = -1;
  public description: string = "";
  public originalSalePrice: number = -1;
  public salePrice: number = -1;
  public wholesalePrice: number = -1;
  public quantity: number = -1;
  public subTotal: number = -1;
  public stock: number = -1;
  public currentStock: number = -1;

  public static builder() {
    return new ProductTicketEntityBuilder();
  }
}

class ProductTicketEntityBuilder {
  private productTicketEntity = new ProductTicketEntity();

  public id(id: number) {
    this.productTicketEntity.id = id;
    return this;
  }

  public barcode(barcode: string) {
    this.productTicketEntity.barcode = barcode;
    return this;
  }

  public description(description: string) {
    this.productTicketEntity.description = description;
    return this;
  }

  public salePrice(salePrice: number) {
    this.productTicketEntity.salePrice = salePrice;
    return this;
  }

  public originalSalePrice(originalSalePrice: number) {
    this.productTicketEntity.originalSalePrice = originalSalePrice;
    return this;
  }

  public wholesalePrice(wholesalePrice: number) {
    this.productTicketEntity.wholesalePrice = wholesalePrice;
    return this;
  }

  public stock(stock: number) {
    this.productTicketEntity.stock = stock;
    return this;
  }

  public currentStock(currentStock: number) {
    this.productTicketEntity.currentStock = currentStock;
    return this;
  }

  public quantity(quantity: number) {
    this.productTicketEntity.quantity = quantity;
    return this;
  }

  public subTotal(subTotal: number) {
    this.productTicketEntity.subTotal = subTotal;
    return this;
  }

  public productId(productId: number) {
    this.productTicketEntity.productId = productId;
    return this;
  }

  public build() {
    return this.productTicketEntity;
  }
}

export default ProductTicketEntity;

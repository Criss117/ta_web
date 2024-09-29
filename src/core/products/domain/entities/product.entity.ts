import ProductSaleEntity from "@Core/products-sale/domain/entities/product-sale.entity";

class ProductEntity {
  public id: number = -1;
  public barcode: string = "";
  public description: string = "";
  public costPrice: number = -1;
  public salePrice: number = -1;
  public wholesalePrice: number = -1;
  public stock: number = -1;
  public minStock: number = -1;
  public isActive: boolean = false;
  public createdAt: Date | null = null;
  public updatedAt: Date | null = null;
  public deletedAt: Date | null = null;
  public productSale: Array<ProductSaleEntity> | null = null;

  public static builder() {
    return new ProductEntityBuilder();
  }
}

export class ProductEntityBuilder {
  private productEntity = new ProductEntity();

  public id(id: number) {
    this.productEntity.id = id;
    return this;
  }

  public barcode(barcode: string) {
    this.productEntity.barcode = barcode;
    return this;
  }

  public description(description: string) {
    this.productEntity.description = description;
    return this;
  }

  public costPrice(costPrice: number) {
    this.productEntity.costPrice = costPrice;
    return this;
  }

  public salePrice(salePrice: number) {
    this.productEntity.salePrice = salePrice;
    return this;
  }

  public wholesalePrice(wholesalePrice: number) {
    this.productEntity.wholesalePrice = wholesalePrice;
    return this;
  }

  public stock(stock: number) {
    this.productEntity.stock = stock;
    return this;
  }

  public minStock(minStock: number) {
    this.productEntity.minStock = minStock;
    return this;
  }

  public isActive(isActive: boolean) {
    this.productEntity.isActive = isActive;
    return this;
  }

  public createdAt(createdAt: Date | null) {
    this.productEntity.createdAt = createdAt;
    return this;
  }

  public updatedAt(updatedAt: Date | null) {
    this.productEntity.updatedAt = updatedAt;
    return this;
  }

  public deletedAt(deletedAt: Date | null) {
    this.productEntity.deletedAt = deletedAt;
    return this;
  }

  public productSale(productSale: Array<ProductSaleEntity> | null) {
    this.productEntity.productSale = productSale;
    return this;
  }

  public build() {
    return this.productEntity;
  }
}

export default ProductEntity;

import ProductEntity from "../../domain/entities/product.entity";
import type { ProductFormDto } from "../models/type";

class ProductMapper {
  public static toDomain(product: ProductFormDto): ProductEntity {
    return ProductEntity.builder()
      .id(product.id || -1)
      .barcode(product.barcode)
      .description(product.description)
      .costPrice(product.costPrice)
      .salePrice(product.salePrice)
      .wholesalePrice(product.wholesalePrice)
      .stock(product.stock)
      .minStock(product.minStock)
      .build();
  }

  public static toDto(product: ProductEntity): ProductFormDto {
    return {
      id: product.id,
      barcode: product.barcode,
      description: product.description,
      costPrice: product.costPrice,
      salePrice: product.salePrice,
      wholesalePrice: product.wholesalePrice,
      stock: product.stock,
      minStock: product.minStock,
    };
  }
}

export default ProductMapper;

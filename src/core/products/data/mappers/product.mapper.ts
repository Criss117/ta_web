import { Product } from "@prisma/client";
import ProductEntity from "../../domain/entities/product.entity";
import CreateProductDto from "../dto/create-product.dto";
import EditProductDto from "../dto/edit-product.dto";

class ProductMapper {
  public static toDomain(product: Product): ProductEntity {
    return ProductEntity.builder()
      .id(product.id)
      .barcode(product.barcode)
      .description(product.description)
      .costPrice(product.costPrice)
      .salePrice(product.salePrice)
      .wholesalePrice(product.wholesalePrice)
      .stock(product.stock)
      .minStock(product.minStock)
      .isActive(product.isActive)
      .createdAt(product.createdAt)
      .updatedAt(product.updatedAt)
      .deletedAt(product.deletedAt)
      .build();
  }

  public static domainToCreateDto(product: ProductEntity): CreateProductDto {
    return {
      barcode: product.barcode,
      description: product.description,
      costPrice: product.costPrice,
      salePrice: product.salePrice,
      wholesalePrice: product.wholesalePrice,
      stock: product.stock,
      minStock: product.minStock,
    };
  }

  public static domainToEditDto(product: ProductEntity): EditProductDto {
    return {
      id: product.id,
      ...this.domainToCreateDto(product),
    };
  }
}

export default ProductMapper;

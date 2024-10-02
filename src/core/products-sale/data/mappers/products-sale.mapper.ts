import ProductEntity from "@Core/products/domain/entities/product.entity";
import ProductSaleEntity from "../../domain/entities/product-sale.entity";
import { ProductSaleSummaryDto } from "../dto/product-sale-summary.dto";
import { ProductSale } from "@prisma/client";

class ProductsSaleMapper {
  static summaryToDomain(
    productsSaleEntity: ProductSaleSummaryDto[]
  ): ProductSaleEntity[] {
    return productsSaleEntity.map((productSale) => {
      const product = ProductEntity.builder();
      if (productSale.product) {
        product
          .id(productSale.product.id)
          .description(productSale.product.description);
      }
      return ProductSaleEntity.builder()
        .id(productSale.id)
        .salePrice(productSale.salePrice)
        .quantity(productSale.quantity)
        .subTotal(productSale.subTotal)
        .productId(productSale.product.id)
        .product(product.build())
        .build();
    });
  }

  static prismaToDomain(productsSale: ProductSale): ProductSaleEntity {
    return ProductSaleEntity.builder()
      .id(productsSale.id)
      .salePrice(productsSale.salePrice)
      .quantity(productsSale.quantity)
      .subTotal(productsSale.subTotal)
      .productId(productsSale.productId)
      .ticketId(productsSale.ticketId)
      .createdAt(productsSale.createdAt)
      .updatedAt(productsSale.updatedAt)
      .deletedAt(productsSale.deletedAt)
      .isActive(productsSale.isActive)
      .build();
  }
}

export default ProductsSaleMapper;

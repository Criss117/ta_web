import type {
  EditProductInputType,
  ProductForm,
} from "@/core/products/mutate-product/models/types";
import { Product } from "@prisma/client";

export class ProductReceivedAdapter {
  static adapt(product: Product | undefined | null): ProductForm | undefined {
    if (!product) return undefined;

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

export class ProductToEditAdapter {
  static adapt(product: ProductForm): EditProductInputType {
    if (!product.id) {
      throw new Error("id not found");
    }

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

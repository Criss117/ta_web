export interface ProductSaleSummaryDto {
  id: number;
  salePrice: number;
  quantity: number;
  subTotal: number;
  product: {
    id: number;
    description: string;
  };
}

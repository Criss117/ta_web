export interface ProductSaleSummaryDto {
  id: string;
  salePrice: number;
  quantity: number;
  subTotal: number;
  product: {
    id: string;
    description: string;
  };
}

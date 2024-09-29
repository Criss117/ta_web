import CreateProductSaleDto from "@Core/products-sale/data/dto/create-product-sale.dto";

interface MakePaymentDto {
  total: number;
  ccNumber?: string;
  clientId?: number;
  productsSale: Array<CreateProductSaleDto>;
}

export default MakePaymentDto;

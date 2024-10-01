import { PrismaTx } from "@Core/common/models/types";

interface VerifyStockDto {
  tx: PrismaTx;
  productId: string;
  quantity: number;
}

export default VerifyStockDto;

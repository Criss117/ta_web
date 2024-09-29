import { PrismaTx } from "@Core/common/models/types";

interface VerifyStockDto {
  tx: PrismaTx;
  productId: number;
  quantity: number;
}

export default VerifyStockDto;

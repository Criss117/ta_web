import { PRODUCT_FORM_MESSAGES } from "@/lib/messages/product.messages";
import { z } from "zod";

export const ProductTicketSchema = z.object({
  id: z.string(),
  barcode: z.string(),
  productId: z.string(),
  description: z.string(),
  originalSalePrice: z.number(),
  salePrice: z.number(),
  wholesalePrice: z.number(),
  quantity: z.number(),
  subTotal: z.number(),
  stock: z.number(),
  currentStock: z.number(),
});

export const TicketSchema = z.object({
  id: z.number(),
  label: z.string(),
  total: z.number().min(0),
  clientId: z.string().optional(),
  ccNumber: z.string().optional(),
  productsTickets: z.array(ProductTicketSchema),
});

export const CommonArtSchema = z.object({
  quantity: z.preprocess(
    (value) => Number(value) || 0,
    z.number().min(1, {
      message: PRODUCT_FORM_MESSAGES.QUANTITY.MIN,
    })
  ),
  barcode: z
    .string({
      required_error: PRODUCT_FORM_MESSAGES.BARCODE.REQUIRED,
    })
    .min(1, {
      message: PRODUCT_FORM_MESSAGES.BARCODE.MIN,
    })
    .max(225, {
      message: PRODUCT_FORM_MESSAGES.BARCODE.MAX,
    }),
  description: z
    .string({
      required_error: PRODUCT_FORM_MESSAGES.DESCRIPTION.REQUIRED,
    })
    .min(5, {
      message: PRODUCT_FORM_MESSAGES.DESCRIPTION.MIN,
    })
    .max(225, {
      message: PRODUCT_FORM_MESSAGES.DESCRIPTION.MAX,
    }),
  salePrice: z.preprocess(
    (value) => Number(value) || 0,
    z
      .number({
        required_error: PRODUCT_FORM_MESSAGES.SALEPRICE.REQUIRED,
      })
      .min(1, {
        message: PRODUCT_FORM_MESSAGES.SALEPRICE.MIN,
      })
  ),
});

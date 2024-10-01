import { z } from "zod";

import { PRODUCT_FORM_MESSAGES } from "@/lib/messages/product.messages";

export const ProductFormSchema = z.object({
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
  costPrice: z.preprocess(
    (value) => Number(value) || 0,
    z
      .number({
        required_error: PRODUCT_FORM_MESSAGES.COSTPRICE.REQUIRED,
      })
      .min(1, {
        message: PRODUCT_FORM_MESSAGES.COSTPRICE.MIN,
      })
  ),
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
  wholesalePrice: z.preprocess(
    (value) => Number(value) || 0,
    z
      .number({
        required_error: PRODUCT_FORM_MESSAGES.WHOLESALEPRICE.REQUIRED,
      })
      .min(1, {
        message: PRODUCT_FORM_MESSAGES.WHOLESALEPRICE.MIN,
      })
  ),
  stock: z.preprocess(
    (value) => Number(value) || 0,
    z
      .number({
        required_error: PRODUCT_FORM_MESSAGES.STOCK.REQUIRED,
      })
      .min(1, {
        message: PRODUCT_FORM_MESSAGES.STOCK.MIN,
      })
  ),
  minStock: z.preprocess(
    (value) => Number(value) || 0,
    z
      .number({
        required_error: PRODUCT_FORM_MESSAGES.MINSTOCK.REQUIRED,
      })
      .min(1, {
        message: PRODUCT_FORM_MESSAGES.MINSTOCK.MIN,
      })
  ),
});

export const EditProductFormSchema = ProductFormSchema.extend({
  id: z.string(),
});

export const ProductSearchSchema = z.object({
  barcode: z.string().min(1),
});

import { CLIENT_FORM_MESSAGES } from "@/lib/messages/product.messages";
import { z } from "zod";

export const ClientFormSchema = z.object({
  ccNumber: z
    .string({
      required_error: CLIENT_FORM_MESSAGES.CCNUMBER.REQUIRED,
    })
    .min(5, {
      message: CLIENT_FORM_MESSAGES.CCNUMBER.MIN,
    }),
  fullName: z
    .string({
      required_error: CLIENT_FORM_MESSAGES.FULLNAME.REQUIRED,
    })
    .min(5, {
      message: CLIENT_FORM_MESSAGES.FULLNAME.MIN,
    })
    .max(255, {
      message: CLIENT_FORM_MESSAGES.FULLNAME.MAX,
    }),
  address: z
    .string()
    .min(5, {
      message: CLIENT_FORM_MESSAGES.ADDRESS.MIN,
    })
    .max(255, {
      message: CLIENT_FORM_MESSAGES.ADDRESS.MAX,
    })
    .nullable(),
  phone: z
    .string()
    .min(10, {
      message: CLIENT_FORM_MESSAGES.PHONE.MIN,
    })
    .max(10, {
      message: CLIENT_FORM_MESSAGES.PHONE.MIN,
    })
    .nullable(),
  creditLimit: z.preprocess(
    (value) => Number(value) || 0,
    z
      .number({
        required_error: CLIENT_FORM_MESSAGES.CREDITLIMIT.REQUIRED,
      })
      .min(1, {
        message: CLIENT_FORM_MESSAGES.CREDITLIMIT.MIN,
      })
  ),
});

export const EditClientFormSchema = ClientFormSchema.extend({
  id: z.number().min(1),
});

export const DeleteClientSchema = z.object({
  id: z.number().min(1),
  ccNumber: z.string(),
});

export const CreateDebtPaymentSchema = z.object({
  clientId: z.number().min(1),
  amount: z.preprocess(
    (value) => Number(value) || 0,
    z
      .number({
        required_error: "Amount is required",
      })
      .min(1, { message: "Amount must be greater than 0" })
  ),
});

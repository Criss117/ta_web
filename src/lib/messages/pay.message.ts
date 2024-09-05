export const PAY_MESSAGES = {
  ERROR_TITLE: "Error al realizar el cobro",
  UNKNOWN_ERROR: "Hubo un error inesperado",
  CREDIT_LIMIT: "El cliente no tiene suficiente crédito",
  ERROR_TO_CREATE: "Error al guardar el pago",
  STOCK_NOT_ENOUGH: "No hay suficiente stock disponible",
  PRODUCT_NOT_EXIST: "El producto no existe",
  SUCCESS: "Cobro realizado exitosamente",
} as const;

export const DEBT_PAYMENT_MESSAGES = {
  ERROR_TITLE: "Error al realizar el abono",
  UNKNOWN_ERROR: "Hubo un error inesperado",
  CREDIT_LIMIT: "El cliente no tiene suficiente crédito",
  ERROR_TO_CREATE: "Error al guardar el abono",
  STOCK_NOT_ENOUGH: "No hay suficiente stock disponible",
  PRODUCT_NOT_EXIST: "El producto no existe",
  SUCCESS: "Abono guardado exitosamente",
} as const;

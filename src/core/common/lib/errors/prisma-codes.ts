/** @format */

export const PRISMA_CODES = {
  ERRORS: [
    {
      code: "P2002",
      message: "El registro ya existe",
    },
    {
      code: "P2003",
      message: "Hubo un error al insertar el registro",
    },
    {
      code: "P2025",
      message: "El registro no existe",
    },
  ],
};

export const AXIOS_ERROR_CODES = {
  ECONNREFUSED: {
    message: "Error de conexión",
    code: "ECONNREFUSED",
  },
} as const;

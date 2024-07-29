import { z } from "zod";

export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

export type ActionState<T, P> = {
  fieldErros?: FieldErrors<T>;
  error?: string | null;
  data?: P | null;
};

export function createSafeAction<T, P>(
  schema: z.Schema<T>,
  handler: (validateData: T) => Promise<ActionState<T, P>>
) {
  return async (data: T): Promise<ActionState<T, P>> => {
    console.log(data);

    const validatedData = schema.safeParse(data);
    if (!validatedData.success) {
      return {
        fieldErros: validatedData.error.flatten().fieldErrors as FieldErrors<T>,
      };
    }

    return await handler(validatedData.data);
  };
}

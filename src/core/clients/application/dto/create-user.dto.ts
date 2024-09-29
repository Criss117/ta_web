import { z } from "zod";
import { ClientFormSchema } from "../models/schemas";

export type CreateClientDto = z.infer<typeof ClientFormSchema>;

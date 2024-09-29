import { z } from "zod";
import { DeleteClientSchema } from "../models/schemas";

export type DeleteClientDto = z.infer<typeof DeleteClientSchema>;

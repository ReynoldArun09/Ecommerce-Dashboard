import { z } from "zod";

export const productSchema = z.object({
  name: z.string().trim().min(4).max(255),
  description: z.string().min(4).max(255),
  price: z.number(),
  stock: z.number(),
});

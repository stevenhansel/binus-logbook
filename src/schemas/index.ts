import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().min(1, { message: 'Email must not be empty' }),
  password: z.string().min(1, { message: 'Password must not be empty' }),
}).required();

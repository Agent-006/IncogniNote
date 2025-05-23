import {z} from 'zod';

export const forgetPasswordSchema = z.object({
    email: z
    .string()
    .email("Invalid email address")
    .min(1, "Email is required")
    .max(100, "Email must be less than 100 characters"),
})
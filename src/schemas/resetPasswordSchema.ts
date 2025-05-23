import { z } from 'zod';

export const resetPasswordSchema = z.object({
    verifyCode: z.string().length(6, "Verification code must be 6 digits"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  }).refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  });
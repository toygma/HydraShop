import { z } from "zod";

// SIGN UP SCHEMA
const baseSignUpSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be 50 characters or less"),

  email: z.email("Invalid email format"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password must be 50 characters or less"),

  confirmPassword: z.string().min(1, "Confirm password is required"),
});

export const signUpSchema = baseSignUpSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
);

export type SignUpFormData = z.infer<typeof signUpSchema>;

// SIGN IN SCHEMA

export const signInSchema = z.object({
  email: z.email("Invalid email format"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password must be 50 characters or less"),
});

export type SignInFormData = z.infer<typeof signInSchema>;

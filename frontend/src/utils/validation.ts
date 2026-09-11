import { z } from "zod";

export const visitorSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters"),

  phone: z
    .string()
    .regex(
      /^[0-9]{10}$/,
      "Phone number must be exactly 10 digits"
    ),

  unit: z
    .string()
    .trim()
    .min(1, "Unit number is required"),

  visitDate: z
    .string()
    .min(1, "Visit date is required")
});

export type VisitorFormData = z.infer<
  typeof visitorSchema
>;
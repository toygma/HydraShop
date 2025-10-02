import { z } from "zod";

export const reviewSchema = z.object({

  rating: z
    .number({
      message: "Rating is required",
    })
    .min(1, "You must provide at least 1 star")
    .max(5, "You can provide a maximum of 5 stars"),

  message: z
    .string()
    .min(10, "Comment must be at least 10 characters")
    .max(1000, "Comment must be at most 1000 characters"),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;

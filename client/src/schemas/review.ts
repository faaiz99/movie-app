import { z } from "zod";

export const reviewSchema = z.object({
  movieId: z
    .string()
    .length(36, { message: "MovieId must be exactly 36 characters" })
    .optional(),
  rating: z
    .number()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating must be at most 5" }),
  title: z.string(),
  description: z.string(),
  userId: z
    .string()
    .length(36, { message: "UserId must be exactly 36 characters" })
    .optional(),
  reviewId: z
    .string()
    .length(36, { message: "ReviewId must be exactly 36 characters" })
    .optional(),
});

type Review = z.infer<typeof reviewSchema>;

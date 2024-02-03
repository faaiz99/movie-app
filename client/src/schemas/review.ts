import { z } from "zod";

export const reviewSchema = z.object({
  id: z.string().optional(),
  movieId: z
    .string()
    .length(36, { message: "MovieId must be exactly 36 characters" })
    .optional(),
  rating: z.string(),
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters" })
    .max(100, { message: "Title must be at most 100 characters" })
    .regex(/^[a-zA-Z0-9 ]*$/, {
      message: "Title can only contain alphanumeric characters and spaces",
    }),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters" })
    .max(200, { message: "Description must be at most 200 characters" }),
  userId: z
    .string()
    .length(36, { message: "UserId must be exactly 36 characters" })
    .optional(),
});

// type Review = z.infer<typeof reviewSchema>;

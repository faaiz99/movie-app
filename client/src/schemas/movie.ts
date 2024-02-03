import { z } from "zod";

export const movieSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters" })
    .max(50, { message: "Title must be at most 100 characters" })
    .regex(/^[a-zA-Z0-9 ]*$/, {
      message: "Title can only contain alphanumeric characters and spaces",
    }),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters" })
    .max(100, { message: "Description must be at most 200 characters" }),
  poster: z.string(),
  trailer: z.string(),
  userId: z
    .string()
    .length(36, { message: "UserId must be exactly 36 characters" }),
});

// type Movie = z.infer<typeof movieSchema>;

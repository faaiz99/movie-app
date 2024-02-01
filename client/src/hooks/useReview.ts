import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../services/api";
import { useMutation } from "@tanstack/react-query";
import { deleteReviewById } from "../services/api";
import { updateReviewById } from "../services/api";
import { addReviewToMovie } from "../services/api";
import { Review } from "../services/api";

export function useReviews(movieId: string) {
  return useQuery({
    queryKey: ["get-reviews", movieId],
    queryFn: () => getReviews(movieId),
  });
}

export function useDeleteReview() {
  return useMutation({
    mutationFn: (reviewId: string) => deleteReviewById(reviewId),
  });
}

export function useUpdateReview() {
  return useMutation({
    mutationFn: ({ id, title, description, rating, userId, movieId }: Review) =>
      updateReviewById({ id, title, description, rating, userId, movieId }),
  });
}

export function useCreateReview() {
  return useMutation({
    mutationFn: ({ title, description, rating, userId, movieId }: Review) =>
      addReviewToMovie({ title, description, rating, userId, movieId }),
  });
}

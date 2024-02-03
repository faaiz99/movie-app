import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../services/review";
import { useMutation } from "@tanstack/react-query";
import { deleteReviewById } from "../services/review";
import { updateReviewById } from "../services/review";
import { addReviewToMovie } from "../services/review";
import { Review } from "../services/review";
import { queryClient } from "../config/query-client";

export function useReviews(movieId: string) {
  return useQuery({
    queryKey: ["get-reviews", movieId],
    queryFn: () => getReviews(movieId),
    enabled: !!movieId,
  });
}

export function useDeleteReview() {
  return useMutation({
    mutationFn: (reviewId: string) => deleteReviewById(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-reviews"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}

export function useUpdateReview() {
  return useMutation({
    mutationFn: ({ id, title, description, rating, userId, movieId }: Review) =>
      updateReviewById({ id, title, description, rating, userId, movieId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-reviews"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}

export function useCreateReview() {
  return useMutation({
    mutationFn: ({ title, description, rating, userId, movieId }: Review) =>
      addReviewToMovie({ title, description, rating, userId, movieId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-reviews"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}

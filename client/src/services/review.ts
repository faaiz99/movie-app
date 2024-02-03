import { User } from "./auth";
import { api } from "../config/axios";
/** Review API Calls */

/** User API Calls */
/**
 * reviews/:movieId [POST,GET]
 * review/:reviewId [GET,POST,DELETE]
 */

export type Review = {
  id?: string;
  title: string;
  description: string;
  rating: number;
  userId: string;
  movieId: string;
  createdAt?: Date;
  updatedAt?: Date;
  user?: User;
};

export const getReviews = async (movieId: string) => {
  const response = await api.get<Review[]>(`/reviews/${movieId}`);
  switch (response.status) {
    case 200:
      return response.data;
    case 404:
      throw new Error(`No Reviews found: ${response.data}`);
    default:
      return response.data;
  }
};

export const addReviewToMovie = async ({
  title,
  description,
  rating,
  userId,
  movieId,
}: Omit<Review, "id">) => {
  rating = parseInt(rating.toString());
  const response = await api.post<Review>(`/reviews/${movieId}`, {
    title,
    description,
    rating,
    userId,
  });
  switch (response.status) {
    case 201: // Review created
      return response.data;
    case 401:
      throw new Error(`Unauthorized: ${response.data}`);
    case 422:
      throw new Error(`Missing or Incomplete Review Data: ${response.data}`);
    default:
      return response.data;
  }
};

export const getReviewById = async (reviewId: string) => {
  const response = await api.get<Review>(`/review/${reviewId}`);
  switch (response.status) {
    case 200: // review found
      return response.data;
    case 404: // review not found
      throw new Error(`Review Id is missing: ${response.data}`);
    case 422:
      throw new Error(`Missing or Incomplete Review Data: ${response.data}`);
    default:
      return response.data;
  }
};

export const updateReviewById = async ({
  id,
  title,
  description,
  rating,
  userId,
  movieId,
}: Review) => {
  rating = parseInt(rating.toString());
  console.log("reviewid", id);
  const response = await api.post<Review>(`/review/${id}`, {
    title,
    description,
    rating,
    userId,
    movieId,
  });
  switch (response.status) {
    case 200:
      return response.data;
    case 404:
      throw new Error(`Review not found: ${response.data}`);
    case 422:
      throw new Error(`Missing or Incomplete Review Data: ${response.data}`);
    default:
      return response.data;
  }
};

export const deleteReviewById = async (reviewId: string) => {
  const response = await api.delete<null>(`/review/${reviewId}`);
  return response.data;
};

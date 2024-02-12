import { api } from "../config/axios";
import { Review } from "./review";

/** Movie API Calls */
export type Movie = {
  id: string;
  title: string;
  description: string;
  poster: string;
  trailer: string;
  userId: string;
  reviews?: Review[];
  createdAt?: Date;
  updatedAt?: Date;
  loading?: boolean;
  _count?: {
    reviews: number;
  };
};

export const getMovies = async () => {
  const response = await api.get<Movie[]>("/movies");
  switch (response.status) {
    case 200:
      return response.data;
    default:
      return response.data;
  }
};

export const createMovie = async ({
  title,
  description,
  poster,
  trailer,
  userId,
}: Omit<Movie, "id">) => {
  const response = await api.post<Movie>("/movies", {
    title,
    description,
    poster,
    trailer,
    userId,
  });

  switch (response.status) {
    case 201:
      return response.data;
    case 409:
      throw new Error(`Movie already exists: ${response.data}`);
    case 422:
      throw new Error(`Missing or Incomplete Movie Data: ${response.data}`);
    default:
      return response.data;
  }
};

export const updateMovieById = async ({
  id,
  title,
  description,
  poster,
  trailer,
  userId,
}: Movie) => {
  const response = await api.post<Movie>(`/movie/${id}`, {
    title,
    description,
    poster,
    trailer,
    userId,
  });
  switch (response.status) {
    case 200:
      return response.data;
    case 404:
      throw new Error(`Movie not found: ${response.data}`);
    case 409:
      throw new Error(`Movie already exists: ${response.data}`);
    case 422:
      throw new Error(`Missing or Incomplete Movie Data: ${response.data}`);
    default:
      return response.data;
  }
};

export const getMovieByTitle = async (title: string) => {
  const response = await api.get<Movie | null>(`/movie/${title}`);
  switch (response.status) {
    case 200:
      return response.data;
    case 404:
      throw new Error(`Movie not found: ${response.data}`);
    case 422:
      throw new Error(`Movie Title is missing: ${response.data}`);
    default:
      return response.data;
  }
};

export const deleteMovieById = async (movieId: string) => {
  const response = await api.delete<null>(`/movie/${movieId}`);
  return response.data;
};

export const getFeaturedMovies = async () => {
  const response = await api.get<Movie[]>("/movies-featured");
  switch (response.status) {
    case 200:
      return response.data;
    case 404:
      throw new Error(`No Movies Found: ${response.data}`);
    default:
      return response.data;
  }
};

export const getMovieByTermInTitle = async (term: string) => {
  const response = await api.get<Movie[]>(`/movies-search/?term=${term}`, {});
  switch (response.status) {
    case 200:
      return response.data;
    case 404:
      throw new Error(`No Movies Found: ${response.data}`);
    case 422:
      throw new Error(`Missing or Incomplete Term: ${response.data}`);
    default:
      return response.data;
  }
};

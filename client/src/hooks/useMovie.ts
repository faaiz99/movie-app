import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getMovies,
  getFeaturedMovies,
  getMovieByTermInTitle,
  createMovie,
  updateMovieById,
  deleteMovieById,
  getMovieByTitle,
  Movie,
} from "../services/movie";
import { queryClient } from "../config/query-client";
export function useMovies() {
  return useQuery({ queryKey: ["movies"], queryFn: getMovies });
}
export function useFeaturedMovies() {
  return useQuery({
    queryKey: ["featured-movies"],
    queryFn: getFeaturedMovies,
  });
}

export function useMovie(title: string) {
  return useQuery({
    queryKey: ["movie", title],
    queryFn: () => getMovieByTitle(title),
    enabled: title.length > 0,
  });
}

export function useSearchMovie(title: string) {
  return useQuery({
    queryKey: ["search-movies", title],
    queryFn: () => getMovieByTermInTitle(title),
    enabled: title.length > 0,
  });
}

export function useUpdateMovie() {
  return useMutation({
    mutationFn: ({ id, title, description, poster, trailer, userId }: Movie) =>
      updateMovieById({ id, title, description, poster, trailer, userId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["movies"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["featured-movies"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}

export function useCreateMovie() {
  return useMutation({
    mutationFn: ({ title, description, trailer, poster, userId }: Movie) =>
      createMovie({ title, description, trailer, poster, userId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["movies"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["featured-movies"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["movie"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}

export function useDeleteMovie() {
  return useMutation({
    mutationFn: (id: string) => deleteMovieById(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["movies"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["featured-movies"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}

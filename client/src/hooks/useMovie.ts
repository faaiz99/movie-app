import { useQuery } from "@tanstack/react-query";
import {
  getMovies,
  getFeaturedMovies,
  getMovieByTermInTitle,
} from "../services/api";
export function useMovies() {
  return useQuery({ queryKey: ["get-movies"], queryFn: getMovies });
}
export function useFeaturedMovies() {
  return useQuery({
    queryKey: ["get-featured-movies"],
    queryFn: getFeaturedMovies,
  });
}

export function useMovie(title: string) {
  return useQuery({
    queryKey: ["get-movie", title],
    queryFn: () => getMovieByTermInTitle(title),
    enabled: title.length > 0,
  });
}

export function useCreateMovie() {
  return useQuery({
    queryKey: ["create-movie"],
    queryFn: () => getMovies(),
  });
}

export function useSearchMovie(title: string) {
  return useQuery({
    queryKey: ["get-movie", title],
    queryFn: () => getMovieByTermInTitle(title),
  });
}

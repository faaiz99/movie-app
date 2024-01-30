import { useQuery } from "@tanstack/react-query"
import { getMovies, getFeaturedMovies, getMovieByTermInTitle } from "../services/api";
export function useMovies() {
	const query = useQuery({ queryKey: ["get-movies"], queryFn: getMovies });
	console.log("query", query);
	return useQuery({ queryKey: ["get-movies"], queryFn: getMovies });
}
export function useFeaturedMovies() {
	return useQuery({ queryKey: ["get-featured-movies"], queryFn: getFeaturedMovies });
}

export function useMovie(title: string) {
	return useQuery({
		queryKey: ["get-movie", title],
		queryFn: () => getMovieByTermInTitle(title),
	});
}
// const query = useQuery({ queryKey: ["get-movies"], queryFn: getMovies });
// console.log("query", query.data);

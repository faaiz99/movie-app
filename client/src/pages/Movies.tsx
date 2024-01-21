import { useEffect } from "react";
import { useState } from "react";
import { lazy, Suspense } from "react";
import { getFeaturedMovies } from "../services/api";
import { getMovies } from "../services/api";
import { Spinner } from "../components";
import { Movie } from "../services/api";
const MovieList = lazy(() =>
  import("../components").then(({ MovieList }) => ({ default: MovieList })),
);

export const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      const results = await Promise.allSettled([
        getMovies(),
        getFeaturedMovies(),
      ]);
      const movies = results[0].status === "fulfilled" ? results[0].value : [];
      const featuredMovies =
        results[1].status === "fulfilled" ? results[1].value : [];
      if (results[0].status === "rejected") {
        // handle error for getMovies
        // Show a Modal showing the error
        console.error("Failed to fetch movies:", results[0].reason);
      }
      if (results[1].status === "rejected") {
        // handle error for getFeaturedMovies
        // Show a Modal showing the error
        console.error("Failed to fetch featured movies:", results[1].reason);
      }
      setMovies(movies);
      setFeaturedMovies(featuredMovies);
      console.log("movies", movies);
      console.log("featuredMovies", featuredMovies);
    }
    fetchMovies();
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <MovieList title={"Movies"} movies={movies} />
      <MovieList title={"Trending Movies"} movies={featuredMovies} />
    </Suspense>
  );
};

import { lazy, Suspense } from "react";
import { useMovies, useFeaturedMovies } from "../hooks/useMovie";
import { Spinner } from "../components";

const MovieListCard = lazy(() =>
  import("../components").then(({ MovieListCard }) => ({
    default: MovieListCard,
  })),
);


export const Movies = () => {
  const {
    data: featuredMovies,
    isError: isFeaturedMoviesError,
    error: featuredMoviesError,
    isPending: isFeaturedMoviesPending,
  } = useFeaturedMovies();

  const {
    data: movies,
    isError: isMoviesError,
    error: moviesError,
    isPending: isMoviesPending,
  } = useMovies();

  if (isMoviesPending || isFeaturedMoviesPending) return <Spinner />;
  if (isMoviesError || isFeaturedMoviesError)
    return <div>{moviesError?.message || featuredMoviesError?.message}</div>;


  return (
    <Suspense fallback={<Spinner />}>
      <MovieListCard title={"Movies"} movies={movies} />
      <MovieListCard title={"Trending Movies"} movies={featuredMovies} />
    </Suspense>
  );
};

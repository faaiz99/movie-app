import { lazy } from "react";
import { useMovies, useFeaturedMovies } from "../hooks/useMovie";
import { Spinner } from "../components";
import { ErrorModal } from "../components";
import { useAuthStore } from "../store/store";
import { checkUserAuth } from "../utils/checkAuthentication";

const MovieListCard = lazy(() =>
  import("../components").then(({ MovieListCard }) => ({
    default: MovieListCard,
  })),
);

export const Movies = () => {
  const userId = useAuthStore((state) => state.session.id);
  const {
    data: featuredMovies,
    isError: isFeaturedMoviesError,
    isPending: isFeaturedMoviesPending,
  } = useFeaturedMovies();

  const {
    data: movies,
    isError: isMoviesError,
    isPending: isMoviesPending,
  } = useMovies();

  const isAuthenticated = checkUserAuth();
  if (isMoviesPending || isFeaturedMoviesPending) return <Spinner />;
  if (isMoviesError || isFeaturedMoviesError)
    return <ErrorModal show={true} message={"Movies could not be fetched"} />;

  return (
    <>
      <MovieListCard
        isAuthenticated={isAuthenticated}
        title={"Movies"}
        movies={movies}
        userId={userId}
        rank={false}
      />
      <MovieListCard
        isAuthenticated={isAuthenticated}
        title={"Trending Movies"}
        movies={featuredMovies}
        userId={userId}
        rank={true}
      />
    </>
  );
};

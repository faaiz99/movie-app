import { lazy } from "react";
import { useParams } from "react-router-dom";
import { slugToTitle } from "../utils/slugToTitle";
import { Spinner } from "../components/";
import { ErrorModal } from "../components/";
import { useMovie } from "../hooks/useMovie";
import { useReviews } from "../hooks/useReview";
import { checkUserAuth } from "../utils/checkAuthentication";
import { useAuthStore } from "../store/store";

const MovieDetailsCard = lazy(() =>
  import("../components/").then(({ MovieDetailsCard }) => ({
    default: MovieDetailsCard,
  })),
);
const TrailerEmbed = lazy(() =>
  import("../components").then(({ TrailerEmbed }) => ({
    default: TrailerEmbed,
  })),
);
const MovieReviewsCard = lazy(() =>
  import("../components").then(({ MovieReviewsCard }) => ({
    default: MovieReviewsCard,
  })),
);

export const MovieDetails = () => {
  const { title: title } = useParams<{ title: string }>();
  const userId = useAuthStore((state) => state.session.id);
  const isAuthenticated = checkUserAuth();
  const {
    data: movie,
    isError: isMovieError,
    isPending: isMoviePending,
  } = useMovie(slugToTitle(title as string));

  const {
    data: reviews,
    isError: isReviewError,
    isPending: isReviewPending,
  } = useReviews(movie?.id as string);

  if (isMoviePending && isReviewPending) return <Spinner />;
  if (isMovieError || isReviewError)
    return (
      <ErrorModal
        show={true}
        message={`Movie data ${slugToTitle(title as string)} could not be fetched`}
      />
    );

  return (
    <>
      <div className="flex flex-col items-center  justify-center bg-gray-50 dark:bg-gray-900">
        {movie && <TrailerEmbed title={movie.title} link={movie.trailer} />}
      </div>
      <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        {movie && (
          <MovieDetailsCard
            isAuthenticated={isAuthenticated}
            movie={movie}
            userId={userId}
          />
        )}
      </div>
      <div className="flex flex-col items-start justify-center bg-gray-50 dark:bg-gray-900">
        {movie && (
          <MovieReviewsCard
            isAuthenticated={isAuthenticated}
            movieId={movie.id as string}
            userId={userId}
            reviews={reviews || []}
          />
        )}
      </div>
    </>
  );
};

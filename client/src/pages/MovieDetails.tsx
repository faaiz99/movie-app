import { lazy } from "react";
import { useParams } from "react-router-dom";
import { slugToTitle } from "../utils/slugToTitle";
import { Spinner } from "../components/";
import { ErrorModal } from "../components/";
import { useMovie } from "../hooks/useMovie";
import { useReviews } from "../hooks/useReview";
import { checkUserAuth } from "../utils/checkAuthentication";

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
  const { movieTitle: title } = useParams<{ movieTitle: string }>();
  const {
    data: movies,
    isError: isMovieError,
    isPending: isMoviePending,
  } = useMovie(slugToTitle(title));
  const {
    data: reviews,
    isError: isReviewError,
    isPending: isReviewPending,
  } = useReviews(movies ? movies[0].id : "");
  const isAuthenticated = checkUserAuth();
  if (isMoviePending && isReviewPending) return <Spinner />;
  if (isMovieError || isReviewError)
    return (
      <ErrorModal
        show={true}
        message={`Movie data ${slugToTitle(title)} could not be fetched`}
      />
    );

  // undefined case will be handled by the useMovie hook
  // Check if movies is defined before trying to access its properties
  if (!movies) return null;
  const movie = movies[0];

  return (
    <>
      <div className="flex flex-col items-center  justify-center bg-gray-50 dark:bg-gray-900">
        <TrailerEmbed title={movie.title} link={movie.trailer} />
      </div>
      <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <MovieDetailsCard isAuthenticated={isAuthenticated} movie={movie} />
      </div>
      <div className="flex flex-col items-start justify-center bg-gray-50 dark:bg-gray-900">
        <MovieReviewsCard
          isAuthenticated={isAuthenticated}
          userId={movie.userId}
          reviews={reviews || []}
        />
      </div>
    </>
  );
};

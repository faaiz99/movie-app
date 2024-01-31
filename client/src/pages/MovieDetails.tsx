import { lazy } from "react";
import { useParams } from "react-router-dom";
import { slugToTitle } from "../utils/slugToTitle";
import { Spinner } from "../components/";
import { ErrorModal } from "../components/";
import { useMovie } from "../hooks/useMovie";
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

export const MovieDetails = () => {
  const { movieTitle: title } = useParams<{ movieTitle: string }>();
  const { data, isError, error, isPending } = useMovie(slugToTitle(title));
  if (isPending) return <Spinner />;
  if (isError) return <ErrorModal show={true} message={`Movie ${slugToTitle(title)} could not be fetched`} />;

  // undefined case will be handled by the useMovie hook
  const movie = data[0];
  return (
      <div className="flex flex-col items-center  justify-center bg-gray-50 dark:bg-gray-900">
        <TrailerEmbed title={movie.title} link={movie.trailer} />
        <MovieDetailsCard
          id={movie.id}
          title={movie.title}
          description={movie.description}
          poster={movie.poster}
          trailer={movie.trailer}
          userId={movie.userId}
          reviews={movie.reviews}
          createdAt={movie.createdAt}
          updatedAt={movie.updatedAt}
        />
      </div>
  );
};


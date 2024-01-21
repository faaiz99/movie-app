import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { slugToTitle } from "../utils/slugToTitle";
import { useEffect } from "react";
import { useState } from "react";
import { getMovieByTermInTitle } from "../services/api";
import { Movie } from "../services/api";
export const MovieDetails = () => {
  const [movie, setMovies] = useState<Movie>();
  const [loading, setLoading] = useState(false);
  const { movieTitle } = useParams<{ movieTitle: string }>();
  const location = useLocation();
  console.log(loading);

  useEffect(() => {
    async function getMovie() {
      const result = await getMovieByTermInTitle(slugToTitle(movieTitle));
      if (result.length > 0) {
        const [movie] = result;
        setMovies(movie);
      } else {
        console.log("No movies found");
      }
    }

    if (location?.state?.movie) {
      setLoading(true);
      setMovies(location.state.movie);
      setLoading(false);
    } else {
      setLoading(true);
      getMovie();
      setLoading(false);
    }
  }, []);

  // <div className="flex  flex-wrap gap-2 py-1 ">
  // <Badge color="info">2024</Badge>
  // <Badge color="gray">Military</Badge>
  // <Badge color="failure">Politics</Badge>
  // <Badge color="success">Revolution</Badge>
  // </div>

  return (
    <div>
      MovieDetails:
      {movie && (
        <div key={movie.id}>
          <h1>{movie.title}</h1>
          {/* <img src={movie.poster} alt={movie.title} /> */}
          <p className="w-full rounded-md border-none px-2 py-2 text-gray-700 outline-none focus:ring-0 dark:bg-inherit dark:text-gray-400">
            {movie.description}
          </p>
          <p>{movie.trailer}</p>
        </div>
      )}
    </div>
  );
};

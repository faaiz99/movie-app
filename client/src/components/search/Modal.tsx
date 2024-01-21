import { Card, Modal as Component, TextInput, Label } from "flowbite-react";
import { useState, useRef, useEffect } from "react";
import { getMovieByTermInTitle } from "../../services/api";
import { HiOutlineArrowRight } from "react-icons/hi";
import { titleToSlug } from "../../utils/titleToSlug";
import { useNavigate } from "react-router-dom";
import { Button } from "..";
import { Movie } from "../../services/api";

type ModalProps = {
  show: boolean;
  onClose: () => void;
};

export const Modal = ({ show, onClose }: ModalProps) => {
  const searchMovieTermRef = useRef<HTMLInputElement>(null);
  const [movies, setMovies] = useState<Movie[]>();
  const [loading, setLoading] = useState(false);
  const [movieTitle, setMovieTitle] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getMovie() {
      const result = await getMovieByTermInTitle(movieTitle);
      if (result.length > 0) {
        setMovies(result);
      } else {
        console.log("No movies found");
      }
    }

    if (movieTitle.length > 0) {
      setLoading(true);
      getMovie();
      setLoading(false);
    } else {
      setMovies([]);
    }
  }, [movieTitle]);

  return (
    <>
      <Component
        show={show}
        dismissible={false}
        onClose={onClose}
        className="backdrop-blur-lg rounded-lg"
        initialFocus={searchMovieTermRef}
      >
        <Component.Header className="border-2 border-gray-300 dark:border-gray-700">
          Search Movies
        </Component.Header>
        <Component.Body className="border-b-2 border-l-2 border-r-2 border-gray-300 dark:border-gray-700">
          <div className=" space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="search" value="" />
              </div>
              <TextInput
                onChange={(e) => {
                  setMovieTitle(e.target.value);
                }}
                ref={searchMovieTermRef}
                id="search"
                type="text"
                placeholder=""
                required
              />
            </div>
            <div className="flex flex-col flex-wrap gap-5">
              {movies &&
                movies.map((movie: Movie) => {
                  return (
                    <Card
                      className="flex flex-row rounded-md"
                      horizontal
                      renderImage={() => (
                        <img
                          loading="lazy"
                          src={movie.poster}
                          alt={`${movie.title} + poster picture`}
                          className="h-full w-32 lg:h-48 lg:w-32 lg:rounded-l"
                        />
                      )}
                    >
                      <h5 className="font-bold tracking-tight text-gray-900 dark:text-white lg:text-2xl">
                        {movie.title.substring(0, 25)}...
                      </h5>
                      <p className="w-full rounded-md border-none text-gray-700 outline-none focus:ring-0 dark:bg-inherit dark:text-gray-400">
                        {movie.description.substring(0, 50)}...
                      </p>
                      <Button
                        title={"Watch Now"}
                        isProcessing={loading}
                        color={"failure"}
                        className={"w-full"}
                        onClick={() =>
                          navigate(`/movie/${titleToSlug(movie.title)}`, {
                            state: { movie },
                          })
                        }
                      >
                        <HiOutlineArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Card>
                  );
                })}
            </div>
          </div>
        </Component.Body>
      </Component>
    </>
  );
};

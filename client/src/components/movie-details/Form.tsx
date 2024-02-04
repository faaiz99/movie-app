import { Label } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "..";
import { Movie } from "../../services/movie";
import { zodResolver } from "@hookform/resolvers/zod";
import { movieSchema } from "../../schemas/movie";

type MovieInputs = {
  id: string;
  title: string;
  description: string;
  poster: string;
  trailer: string;
  userId: string;
};

type FormProps = {
  movie: Movie;
  operation: string;
  handleAddUpdateMovie: (movie: Movie, operation: string) => void;
};

const Form = (props: FormProps) => {
  const operation = props.operation;
  const movie = props.movie;
  const handleAddUpdateMovie = props.handleAddUpdateMovie;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MovieInputs>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      id: movie.id,
      title: movie?.title,
      description: movie?.description,
      userId: movie.userId,
      trailer: "https://youtu.be/uYPbbksJxIg?si=W4RcwyyEuNINHM31",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg",
    },
  });
  const onSubmit: SubmitHandler<MovieInputs> = (data) => {
    handleAddUpdateMovie(data, operation);
  };
  return (
    <div className="rounded-lg bg-white dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
      <div className="space-y-4 rounded-md border-2 border-gray-300 p-6 dark:border-gray-700 sm:p-8 md:space-y-6">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
          Movie
        </h1>
        <form
          data-testid="form"
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Label
              htmlFor="title"
              className={`mb-2 block text-sm font-medium text-gray-900 dark:text-white`}
            >
              Title
            </Label>
            <input
              data-testid="title"
              {...register("title", { required: true })}
              type="text"
              name="title"
              id="title"
              placeholder="Descriptive title of the review"
              className={`${
                errors.title
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500  dark:border-red-500 dark:focus:border-red-500 dark:focus:ring-red-500"
                  : "border-gray-300"
              }  focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm`}
            />
            {errors.title && (
              <span className="text-xs font-semibold text-red-500">
                {errors.title?.message}
              </span>
            )}
          </div>
          <div>
            <Label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </Label>
            <input
              data-testid="description"
              {...register("description", { required: true })}
              type="text"
              name="description"
              id="description"
              placeholder="Some details about the movie"
              className={`${
                errors.description
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:ring-red-500"
                  : "border-gray-300"
              } focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm`}
            />
            {errors.description && (
              <span className="text-xs font-semibold text-red-500">
                {errors.description?.message}
              </span>
            )}
            {errors && (
              <span className="text-xs font-semibold text-red-500">
                {errors.description?.message}
                {errors.id?.message}
                {errors.userId?.message}
                {errors.poster?.message}
                {errors.trailer?.message}
                {errors.title?.message}
              </span>
            )}
          </div>
          <Button
            data-testid="submit"
            type="submit"
            className="w-full rounded-md"
            isProcessing={false}
            title={operation}
          ></Button>
        </form>
      </div>
    </div>
  );
};

export default Form;

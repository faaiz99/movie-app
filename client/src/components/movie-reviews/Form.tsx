import { Select, Label } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "..";
import { Review } from "../../services/review";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema } from "../../schemas/review";
type ReviewInputs = {
  id?: string;
  title: string;
  description: string;
  rating: number;
  movieId: string;
  userId: string;
};

type FormProps = {
  review: Review;
  operation: string;
  handleAddUpdateReview: (review: Review, operation: string) => void;
};

const Form = (props: FormProps) => {
  const operation = props.operation;
  const review = props.review;
  const handleAddUpdateReview = props.handleAddUpdateReview;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewInputs>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      id: review?.id,
      title: review?.title,
      description: review?.description,
      rating: review.rating,
      movieId: review.movieId,
      userId: review.userId,
    },
  });
  const onSubmit: SubmitHandler<ReviewInputs> = (data) => {
    handleAddUpdateReview(data, operation);
  };
  return (
    <div className="rounded-lg bg-white dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
      <div className="space-y-4 rounded-md border-2 border-gray-300 p-6 dark:border-gray-700 sm:p-8 md:space-y-6">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
          Review
        </h1>
        <form
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
          </div>
          <div>
            <Label
              htmlFor="rating"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Rating
            </Label>
            <Select
              {...register("rating", { required: true })}
              name="rating"
              id="rating"
              className={`${
                errors.rating
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:ring-red-500"
                  : "border-gray-300"
              } focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm`}
            >
              <option selected value={"5"}>
                5
              </option>
              <option value={"4"}>4</option>
              <option value={"3"}>3</option>
              <option value={"2"}>2</option>
              <option value={"1"}>1</option>
            </Select>

            {errors.rating && (
              <span className="text-xs font-semibold text-red-500">
                {"Rating is required"}
              </span>
            )}
          </div>
          <Button
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

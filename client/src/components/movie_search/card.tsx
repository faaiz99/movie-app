import { Card as Component } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Button } from "..";
import { Movie } from "../../services/movie";
import { useNavigate } from "react-router-dom";
import { titleToSlug } from "../../utils/title-to-slug";

export const Card = ({ poster, title, description, loading }: Movie) => {
  const navigate = useNavigate();
  return (
    <Component
      className="flex flex-row rounded-md"
      horizontal
      renderImage={() => (
        <img
          loading="lazy"
          src={poster}
          alt={`${title} + poster picture`}
          className="h-full w-32 lg:h-48 lg:w-32 lg:rounded-l"
        />
      )}
    >
      <h5 className="font-bold tracking-tight text-gray-900 dark:text-white lg:text-2xl">
        {title.substring(0, 25)}...
      </h5>
      <p className="w-full rounded-md border-none text-gray-700 outline-none focus:ring-0 dark:bg-inherit dark:text-gray-400">
        {description.substring(0, 50)}...
      </p>
      <Button
        title={"Watch Now"}
        isProcessing={loading as boolean}
        color={"failure"}
        className={"w-full"}
        onClick={() => navigate(`/movie/${titleToSlug(title)}`)}
      >
        <HiOutlineArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </Component>
  );
};

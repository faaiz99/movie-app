import searchDark from "../../assets/search-dark.webp";
import searchLight from "../../assets/search-light.svg";
import { useThemeMode } from "flowbite-react";

export const Search = () => {
  const { mode } = useThemeMode();
  return (
    <div className="hidden w-72 gap-0 rounded-md border-2 border-gray-300 dark:border-gray-700 shadow-md outline-none focus:ring-0 lg:flex cursor-pointer" >
      <div className="flex items-center justify-center px-2">
        {mode === "dark" ? (
          <img
            src={searchDark}
            width={20}
            height={20}
            className="opacity-50 "
          ></img>
        ) : (
          <img
            src={searchLight}
            width={20}
            height={20}
            className="opacity-50 "
          ></img>
        )}
      </div>
      <input
        className="w-full rounded-md border-none px-2 py-2 outline-none focus:ring-0 dark:bg-inherit dark:text-white"
        type="text"
        placeholder="Search your favourite movies..."
      />
    </div>
  );
};

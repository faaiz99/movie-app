import searchDark from "../../assets/search-dark.webp";
import searchLight from "../../assets/search-light.svg";
import { useThemeMode } from "flowbite-react";
import { useState } from "react";
import { Modal } from "./modal";
export const Search = () => {
  const { mode } = useThemeMode();

  const [show, setShow] = useState(false);
  function handleModal() {
    setShow((prev) => !prev);
  }
  return (
    <div
      data-testid="search-container"
      onClick={() => setShow(!show)}
      className="hidden w-72 cursor-pointer gap-0 rounded-md border-2 border-gray-300 shadow-md outline-none hover:bg-gray-200 focus:ring-0 dark:border-gray-700 dark:hover:bg-gray-700 lg:flex"
    >
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
        <p className="w-full rounded-md border-none px-2 py-2 text-gray-700 outline-none focus:ring-0 dark:bg-inherit dark:text-gray-400">
          {" "}
          {"Search your favourite movies..."}
        </p>
      </div>
      <Modal show={show} onClose={handleModal} />
    </div>
  );
};

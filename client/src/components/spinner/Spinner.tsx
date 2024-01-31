import { Spinner as Loader } from "flowbite-react";
export const Spinner = () => {
  return (
    <div className="h-screen justify-center items-center flex bg-gray-50  dark:bg-gray-900">
      <Loader size={"xl"} />
    </div>
  );
};

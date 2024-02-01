import { Spinner as Loader } from "flowbite-react";
export const Spinner = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50  dark:bg-gray-900">
      <Loader size={"xl"} />
    </div>
  );
};

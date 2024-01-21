import { Spinner as Loader } from "flowbite-react";
export const Spinner = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="text-center">
        <Loader aria-label="Center-aligned spinner example" />
      </div>
    </div>
  );
};

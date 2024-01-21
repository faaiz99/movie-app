import { Footer as Component } from "flowbite-react";
import { useNavigate } from "react-router-dom";
export const Footer = () => {
  const navigate = useNavigate();
  return (
    <Component container className="h-auto w-full rounded-none shadow-xl ">
      <Component.Copyright href="#" by="Faaiz Aslam™" year={2024} />
      <div className="flex gap-5">
        <p
          className="cursor-pointer font-semibold dark:text-white"
          onClick={() => navigate("/")}
        >
          Movies
        </p>
        <p
          className="cursor-pointer font-semibold dark:text-white"
          onClick={() => navigate("/signup")}
        >
          Sign up
        </p>
        <p
          className="cursor-pointer font-semibold dark:text-white"
          onClick={() => navigate("/login")}
        >
          Login
        </p>
      </div>
    </Component>
  );
};

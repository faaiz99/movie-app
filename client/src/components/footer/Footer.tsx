import { Footer as Component } from "flowbite-react";
import { useNavigate } from "react-router-dom";
export const Footer = () => {
  const navigate = useNavigate();
  return (
    <Component container className="rounded-none shadow-xl">
      <Component.Copyright href="#" by="Faaiz Aslam™" year={2024} />
      <div className="flex gap-5">
        <p className="font-semibold dark:text-white cursor-pointer" onClick={() => navigate("/")}>Movies</p>
        <p className="font-semibold dark:text-white cursor-pointer" onClick={() => navigate("/signup")}>Sign up</p>
        <p className="font-semibold dark:text-white cursor-pointer" onClick={() => navigate("/login")}>Login</p>
      </div>


    </Component>
  );
};

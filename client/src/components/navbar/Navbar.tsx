import { Navbar as Component } from "flowbite-react";
import popcornDark from "../../assets/popcorn-dark.svg";
import popcornLight from "../../assets/popcorn-light.webp";
import { useThemeMode, DarkThemeToggle } from "flowbite-react";
import { Search } from "..";
import { Authenticated } from "./Authenticated";
import { UnAuthenticated } from "./UnAuthenticated";
import { checkUserAuth } from "../../utils/checkAuthentication";

export const Navbar = () => {
  const { mode } = useThemeMode();
  const isAuthenticated = checkUserAuth();
  return (
    <Component role="navbar" fluid className="shadow-xl">
      <Component.Brand href="/">
        <div className="flex gap-x-2">
          <div>
            {mode === "dark" ? (
              <img
                src={popcornLight}
                alt="Movie"
                className="animate-jump animate-once"
                height={30}
                width={30}
              />
            ) : (
              <img
                src={popcornDark}
                alt="Movie"
                className="animate-jump animate-once"
                height={30}
                width={30}
              />
            )}
          </div>
          <h1 className="flex items-center justify-center text-xl  font-semibold italic leading-6 tracking-wide dark:text-white">
            Movie Night
          </h1>
        </div>
      </Component.Brand>
      <div className="flex space-x-5 md:order-2">
        <Search />
        <DarkThemeToggle />
        {isAuthenticated ? <Authenticated /> : <UnAuthenticated />}
      </div>
    </Component>
  );
};

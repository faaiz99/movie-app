import { Avatar, Dropdown, Navbar as Component } from "flowbite-react";
import popcornDark from "../../assets/popcorn-dark.svg";
import popcornLight from "../../assets/popcorn-light.webp";
import { useThemeMode, DarkThemeToggle } from "flowbite-react";
import { Search } from "..";
import { useNavigate } from "react-router-dom";
export const Navbar = () => {
  const { mode } = useThemeMode();
  const navigate = useNavigate()
  console.log(mode);
  return (
    <Component fluid className="shadow-xl">
      <Component.Brand href="https://flowbite-react.com">
        <div className="flex gap-x-2">
          <div>
            {mode === "dark" ? (
              <img src={popcornLight} alt="Movie" height={30} width={30} />
            ) : (
              <img src={popcornDark} alt="Movie" height={30} width={30} />
            )}
          </div>
          <h1 className="font-semibold flex justify-center items-center  text-xl italic leading-6 tracking-wide dark:text-white">
            Movie Night
          </h1>
        </div>
      </Component.Brand>

      <div className="flex space-x-5 md:order-2">
        <Search />
        <DarkThemeToggle />
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={()=>navigate("/login")}>Login</Dropdown.Item>
        </Dropdown>
        <Component.Toggle />
      </div>
      <Component.Collapse>
        {/* <Component.Link href="#" active >
          Movie Night
        </Component.Link> */}
        {/* <Component.Link href="#">About</Component.Link>
        <Component.Link href="#">Services</Component.Link>
        <Component.Link href="#">Pricing</Component.Link>
        <Component.Link href="#">Contact</Component.Link> */}
      </Component.Collapse>
    </Component>
  );
};

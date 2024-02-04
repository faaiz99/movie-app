import { Dropdown } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/store";
import { Avatar } from "flowbite-react";

export const Authenticated = () => {
  const { email, firstName, lastName } = useAuthStore((state) => state.session);
  const { resetSession } = useAuthStore((state) => state);
  const navigate = useNavigate();
  function HandleLogout() {
    if (localStorage.getItem("movie-night-token")) {
      localStorage.removeItem("movie-night-token");
    }
    resetSession();
    navigate("/");
  }
  return (
    <Dropdown
      data-testid="authenticated"
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
        <span className="block text-sm">{firstName + " " + lastName}</span>
        <span className="block truncate text-sm font-medium">{email}</span>
      </Dropdown.Header>
      {/* <Dropdown.Item>Movies</Dropdown.Item> */}
      {/* <Dropdown.Item>Modify Movies</Dropdown.Item>
      <Dropdown.Item>Delete Account</Dropdown.Item> */}
      <Dropdown.Divider />
      <Dropdown.Item onClick={HandleLogout}>Logout</Dropdown.Item>
    </Dropdown>
  );
};

import { Dropdown } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "flowbite-react";

export const UnAuthenticated = () => {
  const navigate = useNavigate();
  /** CHECK IF LABEL CAN BE REPLACED */
  return (
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
      <Dropdown.Item onClick={() => navigate("/signin")}>Login</Dropdown.Item>
    </Dropdown>
  );
};

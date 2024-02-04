import { Dropdown } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/store";

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
        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
        </div>
      }
    >
      <Dropdown.Header>
        <span className="block text-sm">{firstName + " " + lastName}</span>
        <span className="block truncate text-sm font-medium">{email}</span>
      </Dropdown.Header>
      <Dropdown.Item onClick={HandleLogout}>Logout</Dropdown.Item>
    </Dropdown>
  );
};

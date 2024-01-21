import { useAuthStore } from "../store/store";

export function checkUserAuth(): boolean {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { email } = useAuthStore((state) => state.session);
  console.log("email", email);
  const token = localStorage.getItem("movie-night-token");
  // when loggin in we set the session and token
  if (!email || !token) return false; // not authenticated
  else return true;
}

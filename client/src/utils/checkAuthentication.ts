import { useAuthStore } from "../store/store";
export function checkUserAuth(): boolean {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { email } = useAuthStore((state) => state.session);
  if (email.length !== 0) return true;
  else return false;
}

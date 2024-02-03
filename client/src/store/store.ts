import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
type Session = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
};

export type State = {
  session: Session;
};
export type Action = {
  setSession: (session: Session) => void;
  resetSession: () => void;
};

export const useAuthStore = create<State & Action>()(
  persist(
    (set) => ({
      session: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        token: "",
      },
      setSession: (session: Session) => set({ session }),
      resetSession: () =>
        set({
          session: {
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            token: "",
          },
        }),
    }),
    {
      name: "movie-night",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

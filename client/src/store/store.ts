import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
type Session = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
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
      },
      setSession: (session: Session) => set({ session }),
      resetSession: () =>
        set({
          session: {
            id: "",
            firstName: "",
            lastName: "",
            email: "",
          },
        }),
    }),
    {
      name: "movie-night",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

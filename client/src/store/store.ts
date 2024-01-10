import { create } from 'zustand'

type Session = {
	id: string,
	firstName: string,
	lastName: string,
	email: string,
}

export type State = {
  session: Session
  setSession: (session: Session) => void
  resetSession: () => void
}

export const useAuthStore  = create((set) => ({
  session : {
	id: '',
	firstName: '',
	lastName: '',
	email: '',
  },
  setSession: (session: Session) => set({ session }),
  resetSession: () => set({ userSession: {
	id: '',
	firstName: '',
	lastName: '',
	email: '',
  }}),
}))

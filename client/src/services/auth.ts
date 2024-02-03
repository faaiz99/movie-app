import { api } from "../config/axios";

export type UserWithoutNames = Omit<
  User,
  "firstName" | "lastName" | "id" | "createdAt" | "updatedAt" | "token"
>;

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  token: string;
};

export type RegisterUser = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type UserResponse = {
  user: User;
  token: string;
};

export const authenticationUser = async ({
  email,
  password,
}: UserWithoutNames) => {
  const response = await api.post<UserResponse>("/login", {
    email,
    password,
  });

  switch (response.status) {
    case 200:
      return response.data;
    case 401:
      throw new Error(`Invalid credentials: ${response.data}`);
    case 422:
      throw new Error(`Invalid data: ${response.data}`);
    default:
      return response.data;
  }
};

export const registerUser = async ({
  email,
  password,
  firstName,
  lastName,
}: RegisterUser) => {
  const response = await api.post<Partial<User>>("/register", {
    email,
    password,
    firstName,
    lastName,
  });
  switch (response.status) {
    case 201:
      return response.data;
    case 409:
      throw new Error(`User already exists: ${response.data}`);
    case 422:
      throw new Error(`Invalid data: ${response.data}`);
    default:
      return response.data;
  }
};

export const deleteUser = async (id: string) => {
  const response = await api.delete<null>(`/users/${id}`);
  return response.data;
};

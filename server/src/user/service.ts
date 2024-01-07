import { User, Movie, Review } from "@prisma/client";

export interface IUserRepository {
  register(user: Partial<User>): Promise<User>;
  login(user: Partial<User>): Promise<User>;
  refreshToken(user: Partial<User>): Promise<User>;
}

export const login = async (user:User) => {};

export const register = async (user:User) => {};

export const refreshToken = async (token:any) => {};
